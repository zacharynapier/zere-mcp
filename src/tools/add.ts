import { z } from "zod";
import { defineTool, text } from "../tool.js";

export const add = defineTool({
  name: "add",
  description: "Add two numbers.",
  input: z.object({
    a: z.number(),
    b: z.number(),
  }),
  run: ({ a, b }) => text(String(a + b)),
});
