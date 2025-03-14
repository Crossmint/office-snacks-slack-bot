import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { solana } from "@goat-sdk/wallet-solana";
import { CoreMessage, generateText } from "ai";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
import { officeSnacksBot } from "./goat/office-bot/office-bot.plugin";
import { splToken } from "@goat-sdk/plugin-spl-token";

export const generateResponse = async (
  messages: CoreMessage[],
  updateStatus?: (status: string) => void
) => {
  const payerKeypair = Keypair.fromSecretKey(
    bs58.decode(process.env.SOLANA_SECRET_KEY as string)
  );
  const tools = await getOnChainTools({
    wallet: solana({
      connection: new Connection(process.env.SOLANA_RPC_URL as string),
      keypair: payerKeypair,
    }),
    plugins: [
      crossmintHeadlessCheckout({
        apiKey: process.env.CROSSMINT_API_KEY as string,
      }),
      officeSnacksBot(),
      splToken({
        network: "devnet",
      }),
    ],
  });
  // list all the available tool names
  console.log("🛠️ Available tools:", Object.keys(tools));

  let generateTextResponse = await generateText({
    model: openai("gpt-4"),
    messages,
    tools,
    maxSteps: 10,
    system: getSystemPrompt(payerKeypair.publicKey.toBase58()),
  });

  console.log(
    "🛠️ Generate text response:",
    JSON.stringify(generateTextResponse, null, 2)
  );

  let text = generateTextResponse.text || "Failed to generate response";

  // Convert markdown to Slack mrkdwn format
  return text.replace(/\[(.*?)\]\((.*?)\)/g, "<$2|$1>").replace(/\*\*/g, "*");
};

const getSystemPrompt = (payerAddress: string) => {
  return `
You are an internal company Office Snacks Bot assistant. Your job is to help employees order snacks for their office location.

When an employee requests snacks:
1. Use the get_office_addresses tool to show available office locations
2. Ask which office location they want the snacks delivered to - show a list of the office locations
3. Once they specify the office, proceed with the purchase using that office's address

For the purchase process:
1. Use productLocator format 'amazon:B08SVZ775L'
2. If a URL is provided, extract the product locator from the provided Amazon URL
3. Use the office address as the shipping address
4. Use 'usdc' on 'solana' for payment
5. The recipient.email MUST be 'maxwell@paella.dev', do not set recipient.walletAddress
6. The payment.payerAddress MUST be '${payerAddress}'
7. After purchasing the product, assume the payment is successful and the order is complete - do not tell the user the order is awaiting payment
8. After purchasing the product, if you have the image or image url, show it to the user

Keep responses friendly and concise. After confirming the order, ask if they need anything else.
`;
};
