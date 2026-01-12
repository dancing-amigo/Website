import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const AnonymousMessageForm = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const texts = {
    title: language === "ja" ? "メッセージ" : "Message",
    placeholder:
      language === "ja"
        ? "何かあればどうぞ..."
        : "Feel free to share anything...",
    submitButton: language === "ja" ? "送信" : "Send",
    sending: language === "ja" ? "送信中..." : "Sending...",
    successMessage:
      language === "ja"
        ? "送信しました。"
        : "Sent. Thank you.",
    errorMessage:
      language === "ja"
        ? "エラーが発生しました。"
        : "An error occurred.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed");

      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(texts.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-border pt-16 mt-24">
      <h3 className="font-serif text-xl mb-6">{texts.title}</h3>

      {submitted ? (
        <p className="text-muted">{texts.successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full max-w-md px-0 py-3 text-body bg-transparent border-0 border-b border-border focus:border-primary focus:outline-none resize-none transition-colors"
            rows={3}
            placeholder={texts.placeholder}
            disabled={isSubmitting}
          />
          {error && <p className="text-red-600 text-small mt-2">{error}</p>}

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="text-small text-muted hover:text-primary disabled:opacity-30 transition-colors"
            >
              {isSubmitting ? texts.sending : texts.submitButton}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AnonymousMessageForm;
