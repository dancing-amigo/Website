import { EmbedBlock as EmbedBlockType } from "../../types";

interface EmbedBlockProps {
  embed: EmbedBlockType;
}

function toYoutubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }

    const videoId = parsed.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  } catch {
    return url;
  }
}

function toSpotifyEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("open.spotify.com")) {
      return `https://open.spotify.com/embed${parsed.pathname}`;
    }
    return url;
  } catch {
    return url;
  }
}

const EmbedBlock = ({ embed }: EmbedBlockProps) => {
  if (embed.type === "audio") {
    return (
      <div className="embed-block">
        <audio controls preload="none" className="w-full">
          <source src={embed.url} />
          お使いのブラウザは audio 要素に対応していません。
        </audio>
      </div>
    );
  }

  const src =
    embed.type === "youtube"
      ? toYoutubeEmbedUrl(embed.url)
      : toSpotifyEmbedUrl(embed.url);

  const title = embed.type === "youtube" ? "YouTube player" : "Spotify player";
  const height = embed.type === "youtube" ? "420" : "352";

  return (
    <div className="embed-block">
      <div className={embed.type === "youtube" ? "embed-frame-video" : "embed-frame-audio"}>
        <iframe
          src={src}
          title={title}
          allow={
            embed.type === "youtube"
              ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              : "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          }
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          height={height}
        />
      </div>
    </div>
  );
};

export default EmbedBlock;
