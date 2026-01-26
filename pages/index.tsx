import Search from "../components/search/Search";
import AnonymousMessageForm from "../components/contact/AnonymousMessageForm";
import { useLanguage } from "../contexts/LanguageContext";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="fade-in">
      {/* タイトル */}
      <section className="mb-12">
        <h1 className="font-serif text-display">Takeshi's Blog</h1>
      </section>

      {/* 検索 */}
      <section className="mb-16">
        <Search />
      </section>

      {/* 本文 */}
      {language === "ja" ? (
        <section className="markdown-content max-w-prose">
          <p>
            皆さんこんにちは、橋本武士です。このウェブサイトは、僕の記憶管理・情報共有ツールとして使います。何か思いついたこととか、いいなって思ったものをこういう場所に文字として残しておかないと、すぐに忘れてしまったり、新しいことを考えられなくなったりするので作りました。また、それを公開するのは僕が考えていることを世界に公開するのが個人的な悦びであり、そこに公益性があると考えているからです。
          </p>
          <p>
            「メモ」は、ただの書き溜めの場で、形になっていないふわふわとした抽象概念をなるべくそのまま文字にします。
          </p>
          <p>
            「世界観」は、僕が世界をどう見ているのかについて文章にしたものです。世界を正しく理解するというのが僕の人生の一つのテーマなので、それをちゃんと形式化している場所です。
          </p>
          <p>
            「原則」は、自分はこういうふうに生きていくという意思を宣言し、自分に強制するためのものです。迷ったときには必ずこれに従いますし、僕はこういうふうに行動する人だってのを知っていてほしいです。
          </p>
          <p>
            「抱負」は、未来に対して、自分がやっていきたいなと思ったこと、やるべきだなと思ったことを忘れないように、そしてそれについてより深く考えられるように文章にしたものです。
          </p>
          <p>
            検索機能を使うと、全てのページからそのキーワードが出現したページを引っ張ってこれます。将来的には抽象的な意味検索を可能にしたい思っているのですが、コストの関係で今はまだやりません。
          </p>
          <p>
            もし、このサイトに書いてあるものがあなたの心を動かしたり、気付きを与えられたらぜひ直接連絡をください。X (旧Twitter) のリンクがフッターにあるので、そこからDMをしてくれても構いませんし、以下のフォームから匿名メッセージを送ってくれてもいいです。そうしてくれたら、僕は二つの意味で嬉しくなります。一つは自分の思想が世界に影響を与え、より自分にとって素晴らしいと思う空間に近づくこと。もう一つはあなたのフィードバックによって私の世界の解像度がさらに上がること。ぜひ、よろしくお願いします！
          </p>
        </section>
      ) : (
        <section className="markdown-content max-w-prose">
          <p>
            Hello, this is Takeshi Hashimoto. This website is something I
            use as a tool for managing my memory and sharing information. If I
            don’t leave things I think of, or things I feel are valuable,
            somewhere as written text like this, I quickly forget them, or find
            myself unable to think about new things. That is why I created it.
            I also make it public because I take personal pleasure in exposing
            my thoughts to the world, and because I believe there is a certain
            public value in doing so.
          </p>
          <p>
            “Memo” is simply a place for accumulation. I try to write down
            vague, unformed, and floating abstract concepts as they are, without
            forcing them into shape.
          </p>
          <p>
            “Worldview” is where I put into words how I see the world. One of
            the central themes of my life is to understand the world as
            accurately as possible, and this is the place where I attempt to
            formalize that understanding.
          </p>
          <p>
            “Principles” are declarations of how I choose to live, written to
            bind myself to them. When I am uncertain, I always follow them. They
            are also there so that others can know what kind of person I am and
            how I act.
          </p>
          <p>
            “Aspirations” are writings about what I want to do in the future,
            and what I believe I should do, so that I do not forget them and so
            that I can think about them more deeply over time.
          </p>
          <p>
            By using the search function, you can retrieve all pages across the
            site where a given keyword appears. In the future, I would like to
            enable abstract, semantic search, but for now I am not doing so due
            to cost constraints.
          </p>
          <p>
            If anything written on this site moves you or gives you a new
            insight, please feel free to contact me directly. There is a link to
            X (formerly Twitter) in the footer, and you are welcome to send me a
            DM there, or to send an anonymous message using the form below. If
            you do, I will be happy in two ways. One is that my ideas will have
            influenced the world, bringing it a little closer to a space I
            personally find more meaningful. The other is that your feedback
            will further increase the resolution with which I understand my own
            world.
          </p>
          <p>Thank you, and I hope to hear from you.</p>
        </section>
      )}

      {/* 連絡フォーム */}
      <AnonymousMessageForm />
    </div>
  );
}
