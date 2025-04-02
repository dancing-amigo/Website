import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const AnonymousMessageForm = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // 多言語対応用のテキスト
  const texts = {
    title: language === "ja" ? "匿名メッセージ" : "Anonymous Message",
    placeholder:
      language === "ja"
        ? "あなたの考えやフィードバックを共有してください..."
        : "Share your thoughts or feedback...",
    submitButton: language === "ja" ? "送信" : "Send",
    sending: language === "ja" ? "送信中..." : "Sending...",
    successMessage:
      language === "ja"
        ? "メッセージが送信されました。ありがとうございます！"
        : "Message sent successfully. Thank you!",
    errorMessage:
      language === "ja"
        ? "送信中にエラーが発生しました。後でもう一度お試しください。"
        : "An error occurred while sending. Please try again later.",
    messageRequired:
      language === "ja"
        ? "メッセージを入力してください"
        : "Please enter a message",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 基本的なバリデーション
    if (!message.trim()) {
      setError(texts.messageRequired);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // 成功したらフォームをリセット
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // 5秒後に成功メッセージを非表示
    } catch (err) {
      console.error("Error sending message:", err);
      setError(texts.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <h3 className="text-xl font-medium mb-4">{texts.title}</h3>

      {submitted ? (
        <div className="text-green-600 py-3">{texts.successMessage}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder={texts.placeholder}
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? texts.sending : texts.submitButton}
          </button>
        </form>
      )}
    </div>
  );
};

export default AnonymousMessageForm;
