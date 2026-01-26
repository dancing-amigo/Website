export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  excerpt: string;
  language: string; // 'ja' または 'en'
  translationKey?: string; // 同じ記事の異なる言語版を関連付ける
}

export interface SearchResult extends Post {
  matchLocations: string[];
  snippet: string;
}

export interface Worldview {
  slug: string;
  title: string;
  content: string;
}

export interface Principal {
  slug: string;
  title: string;
  content: string;
}

// 統合検索結果
export interface UnifiedSearchResult {
  type: "memo" | "worldview" | "work";
  title: string;
  description: string;
  url: string;
  snippet?: string;
}
