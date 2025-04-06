import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, SearchResult } from "../types";

const contentDirectory = path.join(process.cwd(), "content");

export function getMemoBySlug(slug: string, language: string = "en"): Post {
  const memoDirectory = path.join(contentDirectory, "weekly-memo", language);
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
    const memoDirectory = path.join(contentDirectory, "weekly-memo", lang);

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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 翻訳リンクを取得する関数
export function getTranslation(
  post: Post,
  targetLanguage: string
): Post | null {
  if (!post.translationKey) return null;

  try {
    // 同じtranslationKeyを持つ他言語の記事を検索
    const otherLanguageMemos = getAllMemos(targetLanguage);
    return (
      otherLanguageMemos.find(
        (memo) => memo.translationKey === post.translationKey
      ) || null
    );
  } catch (error) {
    console.error("Error finding translation:", error);
    return null;
  }
}

export function searchMemosByKeyword(
  keyword: string,
  language?: string
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
        tag.toLowerCase().includes(lowercasedKeyword)
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
          keywordIndex + lowercasedKeyword.length + 100
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
  language?: string
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
