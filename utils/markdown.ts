import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  Post,
  SearchResult,
  Worldview,
  Principal,
  UnifiedSearchResult,
} from "../types";

const contentDirectory = path.join(process.cwd(), "content");

export function getMemoBySlug(slug: string, language: string = "en"): Post {
  const memoDirectory = path.join(contentDirectory, "memo", language);
  const fullPath = path.join(memoDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    language: language,
    translationKey: data.translationKey || "",
  };
}

export function getAllMemos(language?: string): Post[] {
  // 言語が指定されている場合はその言語のみ、指定がない場合は全言語
  const languages = language ? [language] : ["en", "ja"];
  let allMemos: Post[] = [];

  for (const lang of languages) {
    const memoDirectory = path.join(contentDirectory, "memo", lang);

    // ディレクトリが存在しない場合はスキップ
    if (!fs.existsSync(memoDirectory)) {
      continue;
    }

    const slugs = fs
      .readdirSync(memoDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));

    const memos = slugs.map((slug) => getMemoBySlug(slug, lang));
    allMemos = [...allMemos, ...memos];
  }

  // 日付でソート
  return allMemos.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getAspirationBySlug(
  slug: string,
  language: string = "en",
): Post {
  const aspirationDirectory = path.join(
    contentDirectory,
    "aspiration",
    language,
  );
  const fullPath = path.join(aspirationDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.createdAt || data.date, // 後方互換性のためdateも使用
    createdAt: data.createdAt || data.date,
    updatedAt: data.updatedAt || data.createdAt || data.date,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    language: language,
    translationKey: data.translationKey || "",
  };
}

export function getAllAspirations(language?: string): Post[] {
  // 言語が指定されている場合はその言語のみ、指定がない場合は全言語
  const languages = language ? [language] : ["en", "ja"];
  let allAspirations: Post[] = [];

  for (const lang of languages) {
    const aspirationDirectory = path.join(contentDirectory, "aspiration", lang);

    // ディレクトリが存在しない場合はスキップ
    if (!fs.existsSync(aspirationDirectory)) {
      continue;
    }

    const slugs = fs
      .readdirSync(aspirationDirectory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));

    const aspirations = slugs.map((slug) => getAspirationBySlug(slug, lang));
    allAspirations = [...allAspirations, ...aspirations];
  }

  // createdAt（作成日）でソート
  return allAspirations.sort(
    (a, b) =>
      new Date(b.createdAt || b.date).getTime() -
      new Date(a.createdAt || a.date).getTime(),
  );
}

export function getAllWorldviews(language: string = "ja"): Worldview[] {
  const worldviewDirectory = path.join(contentDirectory, "worldview", language);

  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(worldviewDirectory)) {
    return [];
  }

  const slugs = fs
    .readdirSync(worldviewDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const worldviews = slugs
    .map((slug) => getWorldviewBySlug(slug, language))
    .sort((a, b) => parseInt(a.slug) - parseInt(b.slug));

  return worldviews;
}

export function getWorldviewBySlug(
  slug: string,
  language: string = "ja",
): Worldview {
  const worldviewDirectory = path.join(contentDirectory, "worldview", language);
  const fullPath = path.join(worldviewDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const lines = content.split("\n");
  const title = lines[0].replace("# ", "");
  const contentWithoutTitle = lines.slice(1).join("\n");

  return {
    slug,
    content: contentWithoutTitle,
    title,
  };
}

export function getAllPrincipals(language: string = "ja"): Principal[] {
  const principalDirectory = path.join(
    contentDirectory,
    "principals",
    language,
  );

  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(principalDirectory)) {
    return [];
  }

  const slugs = fs
    .readdirSync(principalDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const principals = slugs
    .map((slug) => getPrincipalBySlug(slug, language))
    .sort((a, b) => parseInt(a.slug) - parseInt(b.slug));

  return principals;
}

export function getPrincipalBySlug(
  slug: string,
  language: string = "ja",
): Principal {
  const principalDirectory = path.join(
    contentDirectory,
    "principals",
    language,
  );
  const fullPath = path.join(principalDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const lines = content.split("\n");
  const title = lines[0].replace("# ", "");
  const contentWithoutTitle = lines.slice(1).join("\n");

  return {
    slug,
    content: contentWithoutTitle,
    title,
  };
}

// 翻訳リンクを取得する関数
export function getTranslation(
  post: Post,
  targetLanguage: string,
): Post | null {
  if (!post.translationKey) return null;

  try {
    // 同じtranslationKeyを持つ他言語の記事を検索
    const otherLanguageMemos = getAllMemos(targetLanguage);
    return (
      otherLanguageMemos.find(
        (memo) => memo.translationKey === post.translationKey,
      ) || null
    );
  } catch (error) {
    console.error("Error finding translation:", error);
    return null;
  }
}

export function searchMemosByKeyword(
  keyword: string,
  language?: string,
): SearchResult[] {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const allMemos = language ? getAllMemos(language) : getAllMemos();
  const lowercasedKeyword = keyword.toLowerCase().trim();

  // キーワードに完全に一致する記事のみをフィルタリング
  return allMemos
    .filter((memo) => {
      // より厳密な検索条件
      const inTitle = memo.title.toLowerCase().includes(lowercasedKeyword);
      const inContent = memo.content.toLowerCase().includes(lowercasedKeyword);
      const inExcerpt = memo.excerpt.toLowerCase().includes(lowercasedKeyword);
      const inTags = memo.tags.some((tag) =>
        tag.toLowerCase().includes(lowercasedKeyword),
      );

      // いずれかに完全一致する場合のみtrue
      return inTitle || inContent || inExcerpt || inTags;
    })
    .map((memo) => {
      // 検索結果に一致した場所の情報を追加
      const matchLocations = [];

      if (memo.title.toLowerCase().includes(lowercasedKeyword)) {
        matchLocations.push("title");
      }

      if (memo.content.toLowerCase().includes(lowercasedKeyword)) {
        matchLocations.push("content");
      }

      if (memo.excerpt.toLowerCase().includes(lowercasedKeyword)) {
        matchLocations.push("excerpt");
      }

      if (
        memo.tags.some((tag) => tag.toLowerCase().includes(lowercasedKeyword))
      ) {
        matchLocations.push("tags");
      }

      // コンテンツ内でキーワードが見つかった場合、より良いスニペットを生成
      let snippet = "";
      if (matchLocations.includes("content")) {
        const contentLower = memo.content.toLowerCase();
        const keywordIndex = contentLower.indexOf(lowercasedKeyword);

        // キーワードの前後により多くのコンテキストを表示
        const snippetStart = Math.max(0, keywordIndex - 100);
        const snippetEnd = Math.min(
          memo.content.length,
          keywordIndex + lowercasedKeyword.length + 100,
        );

        snippet = memo.content.substring(snippetStart, snippetEnd).trim();

        // スニペットが文の途中から始まる/終わる場合は...を追加
        if (snippetStart > 0) snippet = "..." + snippet;
        if (snippetEnd < memo.content.length) snippet = snippet + "...";
      } else if (matchLocations.includes("excerpt")) {
        // 内容が見つからない場合は抜粋を使用
        snippet = memo.excerpt;
      }

      return {
        ...memo,
        matchLocations,
        snippet,
      };
    })
    .sort((a, b) => {
      // 優先順位付け: title > tags > content
      if (
        a.matchLocations.includes("title") &&
        !b.matchLocations.includes("title")
      ) {
        return -1;
      }
      if (
        !a.matchLocations.includes("title") &&
        b.matchLocations.includes("title")
      ) {
        return 1;
      }
      if (
        a.matchLocations.includes("tags") &&
        !b.matchLocations.includes("tags")
      ) {
        return -1;
      }
      if (
        !a.matchLocations.includes("tags") &&
        b.matchLocations.includes("tags")
      ) {
        return 1;
      }
      // デフォルトは日付順
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getMemosByTag(tag: string, language?: string): Post[] {
  const allMemos = language ? getAllMemos(language) : getAllMemos();
  return allMemos.filter((memo) => memo.tags.includes(tag));
}

export function getAllTags(
  language?: string,
): { tag: string; count: number }[] {
  const allMemos = language ? getAllMemos(language) : getAllMemos();
  const tagCount: Record<string, number> = {};

  allMemos.forEach((memo) => {
    memo.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.keys(tagCount)
    .map((tag) => ({ tag, count: tagCount[tag] }))
    .sort((a, b) => b.count - a.count);
}

// Work データ（静的）
const worksData = [
  {
    title: "Singular Radio",
    description: {
      ja: "テクノロジー、思考、未来について語るPodcast",
      en: "A podcast about technology, thinking, and the future",
    },
    url: "https://www.youtube.com/@SingularRadio",
  },
  {
    title: "Laplace",
    description: {
      ja: "戦略と確率のボードゲーム",
      en: "A board game of strategy and probability",
    },
    url: "https://www.laplace.zone/",
  },
  {
    title: "YouTube",
    description: {
      ja: "個人チャンネル",
      en: "Personal channel",
    },
    url: "https://www.youtube.com/@takeshi-hashimoto",
  },
  {
    title: "X",
    description: {
      ja: "@dancing_amigo",
      en: "@dancing_amigo",
    },
    url: "https://x.com/dancing_amigo",
  },
];

// 統合検索関数
export function searchAll(
  keyword: string,
  language: string = "en",
): UnifiedSearchResult[] {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const lowercasedKeyword = keyword.toLowerCase().trim();
  const results: UnifiedSearchResult[] = [];

  // Memo を検索
  const allMemos = getAllMemos(language);
  allMemos.forEach((memo) => {
    const inTitle = memo.title.toLowerCase().includes(lowercasedKeyword);
    const inContent = memo.content.toLowerCase().includes(lowercasedKeyword);
    const inExcerpt = memo.excerpt.toLowerCase().includes(lowercasedKeyword);
    const inTags = memo.tags.some((tag) =>
      tag.toLowerCase().includes(lowercasedKeyword),
    );

    if (inTitle || inContent || inExcerpt || inTags) {
      let snippet = memo.excerpt;
      if (inContent) {
        const contentLower = memo.content.toLowerCase();
        const keywordIndex = contentLower.indexOf(lowercasedKeyword);
        const snippetStart = Math.max(0, keywordIndex - 50);
        const snippetEnd = Math.min(
          memo.content.length,
          keywordIndex + lowercasedKeyword.length + 50,
        );
        snippet = memo.content.substring(snippetStart, snippetEnd).trim();
        if (snippetStart > 0) snippet = "..." + snippet;
        if (snippetEnd < memo.content.length) snippet = snippet + "...";
      }

      results.push({
        type: "memo",
        title: memo.title,
        description: language === "ja" ? "メモ" : "Memo",
        url: `/memo/${memo.slug}?lang=${memo.language}`,
        snippet,
      });
    }
  });

  // Worldview を検索
  const allWorldviews = getAllWorldviews(language);
  allWorldviews.forEach((worldview) => {
    const inTitle = worldview.title.toLowerCase().includes(lowercasedKeyword);
    const inContent = worldview.content
      .toLowerCase()
      .includes(lowercasedKeyword);

    if (inTitle || inContent) {
      let snippet = "";
      if (inContent) {
        const contentLower = worldview.content.toLowerCase();
        const keywordIndex = contentLower.indexOf(lowercasedKeyword);
        const snippetStart = Math.max(0, keywordIndex - 50);
        const snippetEnd = Math.min(
          worldview.content.length,
          keywordIndex + lowercasedKeyword.length + 50,
        );
        snippet = worldview.content.substring(snippetStart, snippetEnd).trim();
        if (snippetStart > 0) snippet = "..." + snippet;
        if (snippetEnd < worldview.content.length) snippet = snippet + "...";
      }

      results.push({
        type: "worldview",
        title: worldview.title,
        description: language === "ja" ? "世界観" : "Worldview",
        url: `/worldview?lang=${language}`,
        snippet,
      });
    }
  });

  // Work を検索
  worksData.forEach((work) => {
    const desc = work.description[language as "ja" | "en"];
    const inTitle = work.title.toLowerCase().includes(lowercasedKeyword);
    const inDescription = desc.toLowerCase().includes(lowercasedKeyword);

    if (inTitle || inDescription) {
      results.push({
        type: "work",
        title: work.title,
        description: language === "ja" ? "作品" : "Work",
        url: work.url,
      });
    }
  });

  return results;
}
