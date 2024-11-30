import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { AnyZodObject, z } from "zod";

export interface Tool<Input extends AnyZodObject = AnyZodObject> {
  name: string;
  description: string;
  input: Input;
  run(input: z.infer<Input>): CallToolResult | Promise<CallToolResult>;
}

export function defineTool<Input extends AnyZodObject>(tool: Tool<Input>): Tool<Input> {
  return tool;
}

export function text(value: string): CallToolResult {
  return { content: [{ type: "text", text: value }] };
}
