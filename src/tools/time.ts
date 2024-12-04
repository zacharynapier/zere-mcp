import { z } from "zod";
import { defineTool, text } from "../tool.js";

export const currentTime = defineTool({
  name: "current_time",
  description: "Get the current date and time in a given time zone.",
  input: z.object({
    timeZone: z.string().default("UTC").describe("IANA time zone, e.g. America/New_York"),
  }),
  run: ({ timeZone }) => {
    const formatted = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone,
    }).format(new Date());

    return text(formatted);
  },
});
