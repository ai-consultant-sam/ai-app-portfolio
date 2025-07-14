import OpenAI from "openai";
import { EmailGenerationRequest } from "@shared/schema";

interface GeneratedEmail {
  subject: string;
  body: string;
}

export async function generateSalesEmail(request: EmailGenerationRequest & { apiKey: string }): Promise<GeneratedEmail> {
  const { userProfile, customer, purpose, tone, length, apiKey } = request;

  // Create OpenAI instance with the provided API key
  const openai = new OpenAI({ 
    apiKey: apiKey
  });

  // Create purpose-specific prompts
  const purposeMap = {
    initial: "初回のアプローチメール",
    followup: "フォローアップメール", 
    proposal: "提案書送付メール",
    meeting: "商談・打ち合わせ依頼メール"
  };

  const toneMap = {
    formal: "丁寧でフォーマルな敬語を使用し、ビジネス文書として適切な",
    friendly: "親しみやすく温かみのある、でも礼儀正しい",
    casual: "カジュアルで親近感のある、気軽に話しかけるような"
  };

  const systemPrompt = `あなたは日本の優秀な営業担当者です。以下の条件に基づいて、効果的な営業メールを生成してください。

条件:
- メールの種類: ${purposeMap[purpose]}
- トーン: ${toneMap[tone]}トーン
- 文字数: 約${length}文字
- 送信者: ${userProfile.name}（${userProfile.company}・${userProfile.position || '担当者'}）
- 受信者: ${customer.contactName}様（${customer.company}・${customer.department || ''}）
- 業界: ${customer.industry}

必須要件:
1. 件名と本文を生成する
2. 日本のビジネスマナーに従う
3. 相手の業界に適した内容にする
4. 具体的で魅力的な提案を含める
5. 次のアクションを明確にする

JSON形式で以下のように出力してください:
{
  "subject": "メールの件名",
  "body": "メールの本文"
}`;

  const userPrompt = `以下の情報を基に営業メールを作成してください:

【送信者情報】
- 名前: ${userProfile.name}
- 会社: ${userProfile.company}
- 役職: ${userProfile.position || '担当者'}
- メール: ${userProfile.email}

【受信者情報】
- 会社: ${customer.company}
- 担当者: ${customer.contactName}
- 業界: ${customer.industry}
- 部署: ${customer.department || '未指定'}

【メール設定】
- 目的: ${purposeMap[purpose]}
- トーン: ${toneMap[tone]}
- 文字数: 約${length}文字`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!result.subject || !result.body) {
      throw new Error("Invalid response format from OpenAI");
    }

    return {
      subject: result.subject,
      body: result.body
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`メール生成に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}
