import { GetStaticProps } from "next";
import EntryList from "../../components/content/EntryList";
import { ContentEntry } from "../../types";
import { getAllEntries } from "../../utils/content";

interface SectionPageProps {
  entries: ContentEntry[];
}

export default function ViewprintPage({ entries }: SectionPageProps) {
  return (
    <div className="fade-in">
      <EntryList entries={entries} section="viewprint" />
    </div>
  );
}

export const getStaticProps: GetStaticProps<SectionPageProps> = async () => {
  return {
    props: {
      entries: getAllEntries("viewprint"),
    },
  };
};
