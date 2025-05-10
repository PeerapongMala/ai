import dotenv from "dotenv";
import OpenAI from "openai";

import { bullyBackAgent } from "./src/agents/bully-back-agent";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const run = async (userPrompt: string) => {
  console.log("Comfort & Comeback Time!");
  const comfortAgent = new bullyBackAgent(client);
  const comfortResponse = await comfortAgent.bullyBackAgent(
    "โดนเพื่อนในห้องบูลลี่"
  );

  console.log("💖 Comfort Message:", comfortResponse.comfortMessage);
  console.log("😈 Comeback Message:", comfortResponse.comebackMessage);
};
