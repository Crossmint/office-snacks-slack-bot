import { z } from "zod";

/**
 * Office addresses web tool
 * TODO: in production, replace with access to a DB
 */
export const officeAddressesTool = {
  name: "get_office_addresses",
  description: "Get the addresses of the offices",
  parameters: z.object({}),
  execute: async () => {
    return JSON.parse(process.env.OFFICE_ADDRESSES || "[]");
  },
};
