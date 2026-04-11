import { SectionKey } from "../types";

export const sectionConfig: Record<
  SectionKey,
  {
    title: string;
    description: string;
    directory: string;
    sort: "order" | "date";
    allowEmbeds: boolean;
  }
> = {
  principals: {
    title: "Principals",
    description:
      "自分が自分であるための条件と、大事にしている哲学を章立てで置く場所。",
    directory: "principals",
    sort: "order",
    allowEmbeds: false,
  },
  viewprint: {
    title: "Viewprint",
    description:
      "映画、音楽、漫画、その他の作品を見たときに何を感じたかを残していく場所。",
    directory: "viewprint",
    sort: "date",
    allowEmbeds: true,
  },
  artifacts: {
    title: "Artifacts",
    description: "小説、音楽、制作物など、自分が形として残したものを置く場所。",
    directory: "artifacts",
    sort: "date",
    allowEmbeds: true,
  },
};

export function getSectionMeta(section: SectionKey) {
  return sectionConfig[section];
}
