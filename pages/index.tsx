export default function Home() {
  return (
    <div className="fade-in">
      <section
        className="relative flex min-h-screen items-end overflow-hidden bg-black bg-cover bg-center"
        style={{ minHeight: "100dvh", backgroundImage: "url('/hero-space.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/5 to-black/55" />
      </section>
    </div>
  );
}
