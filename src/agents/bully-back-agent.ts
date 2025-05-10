import OpenAI from "openai";

export class bullyBackAgent {
  private client: OpenAI;

  constructor(client: OpenAI) {
    this.client = client;
  }

  async bullyBackAgent(
    userPrompt: string
  ): Promise<{ comfortMessage: string; comebackMessage: string }> {
    const prompt = `มีคนบูลลี่ว่า: "${userPrompt}"
ช่วยปลอบใจด้วยคำพูดที่อบอุ่น เป็นกันเอง และให้กำลังใจอย่างจริงใจ จากนั้นช่วยคิดคำด่ากลับแบบแซะแรงๆ พร้อมใส่มาเป็น JSON: { "comfortMessage": "...", "comebackMessage": "..." }`;

    const completion = await this.client.chat.completions.create({
      model: process.env.OPENAI_MODEL_NAME || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    try {
      const content = completion.choices[0].message.content || "{}";
      return JSON.parse(content);
    } catch (e) {
      return {
        comfortMessage: "ไม่สามารถให้กำลังใจได้ในตอนนี้ ลองใหม่อีกครั้งนะ!",
        comebackMessage: "",
      };
    }
  }
}
