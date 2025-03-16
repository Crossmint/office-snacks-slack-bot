import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { solana } from "@goat-sdk/wallet-solana";
import { type CoreMessage, generateText } from "ai";
import { Connection, Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { crossmintHeadlessCheckout } from "@goat-sdk/plugin-crossmint-headless-checkout";
import { splToken } from "@goat-sdk/plugin-spl-token";
import { officeAddressesTool } from "./tools/office-addresses.tool";
import { recommendedSnacksTool } from "./tools/recommended-snacks.tool";

export const generateResponse = async (
  messages: CoreMessage[],
  updateStatus?: (status: string) => void
) => {
  const payerKeypair = Keypair.fromSecretKey(
    bs58.decode(process.env.SOLANA_SECRET_KEY as string)
  );
  // Get on-chain tools from GOAT SDK
  const onChainTools = await getOnChainTools({
    wallet: solana({
      connection: new Connection(process.env.SOLANA_RPC_URL as string),
      keypair: payerKeypair,
    }),
    plugins: [
      crossmintHeadlessCheckout({
        apiKey: process.env.CROSSMINT_API_KEY as string,
      }),
      splToken({
        network: "devnet",
      }),
    ],
  });
  
  // Combine on-chain tools with our web tool
  const tools = {
    ...onChainTools,
    get_office_addresses: officeAddressesTool,
    get_recommended_snacks: recommendedSnacksTool,
  };
  // list all the available tool names
  console.log("🛠️ Available tools:", Object.keys(tools));

  const generateTextResponse = await generateText({
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

  const text = generateTextResponse.text || "Failed to generate response";

  // Convert markdown to Slack mrkdwn format
  return text.replace(/\[(.*?)\]\((.*?)\)/g, "<$2|$1>").replace(/\*\*/g, "*");
};

const getSystemPrompt = (payerAddress: string) => {
  return `
You are a friendly and helpful Office Snacks Assistant. Your name is SnackBot. Your job is to help team members order snacks and supplies for their office location.

When someone requests snacks or supplies:
1. Use the get_office_addresses tool to show available office locations
2. Ask which office location they want the items delivered to - show a list of the office locations
3. Once they specify the office, ask for their email address to send the order confirmation to
4. Once you have both the office location and email address, proceed with the purchase using that office's address

For the purchase process:
1. Use productLocator format 'amazon:B08SVZ775L'
2. If a URL is provided, extract the product locator from the provided Amazon URL
3. Use the office address as the shipping address
4. Use 'usdc' on 'solana' for payment
5. The recipient.email MUST be the email provided by the user, do not set recipient.walletAddress
6. The payment.payerAddress MUST be '${payerAddress}'
7. After purchasing the product, assume the payment is successful and the order is complete - do not tell the user the order is awaiting payment
8. After purchasing the product, if you have the image or image url, show it to the user

Keep your tone friendly, helpful, and enthusiastic. Use emojis occasionally to add personality. After confirming an order, always ask if there's anything else you can help with.
`;
};
