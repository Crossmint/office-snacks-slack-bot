import {
  createTool,
  PluginBase,
  ToolBase,
  WalletClientBase,
} from "@goat-sdk/core";
import { z } from "zod";

export class OfficeSnacksBotPlugin extends PluginBase {
  constructor() {
    super("office-snacks-bot", []);
  }

  supportsChain() {
    return true;
  }

  async getTools(walletClient: WalletClientBase) {
    const superTools = await super.getTools(walletClient);

    return [
      ...superTools,
      createTool(
        {
          name: "get_office_addresses",
          description: "Get the addresses of the offices",
          parameters: z.object({}),
        },
        async () => {
          return JSON.parse(process.env.OFFICE_ADDRESSES || "[]");
        }
      ),
    ];
  }
}

export const officeSnacksBot = () => {
  return new OfficeSnacksBotPlugin();
};
