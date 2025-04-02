import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// メール送信用のトランスポーターを設定
// 注意: 実際のメール設定は環境変数やサーバー側の設定で行う必要があります
// ここではGmailを例にしていますが、本番環境では専用のSMTPサーバーを使用することをお勧めします
const transporter = nodemailer.createTransport({
  service: "gmail", // Gmail、Outlook、SendGridなど。または独自のSMTPサーバー設定
  auth: {
    user: process.env.EMAIL_USER, // 環境変数からメールアドレスを読み込む
    pass: process.env.EMAIL_PASS, // 環境変数からパスワードまたはアプリパスワードを読み込む
  },
});

// 受信者のメールアドレス
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "your-email@example.com"; // あなたのメールアドレスを設定

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POSTリクエストのみを許可
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    // メッセージが空でないことを確認
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // メールの内容を構成
    const mailOptions = {
      from: process.env.EMAIL_USER, // 送信者（上記のトランスポーターで使用するアドレス）
      to: RECIPIENT_EMAIL, // 受信者（あなたのメールアドレス）
      subject: "【匿名メッセージ】ウェブサイトからの新しいメッセージ",
      text: `
ウェブサイトから新しい匿名メッセージが届きました。

----------- メッセージの内容 -----------
${message.trim()}
---------------------------------------

送信日時: ${new Date().toLocaleString()}
`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">ウェブサイトから新しい匿名メッセージが届きました</h2>
  
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p style="white-space: pre-wrap;">${message
      .trim()
      .replace(/\n/g, "<br>")}</p>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    送信日時: ${new Date().toLocaleString()}
  </p>
</div>
`,
    };

    // メールを送信
    await transporter.sendMail(mailOptions);

    // 成功レスポンスを返す
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
