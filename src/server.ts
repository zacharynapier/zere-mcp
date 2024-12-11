import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { text, type Tool } from "./tool.js";

export function createServer(tools: readonly Tool[]): Server {
  const server = new Server(
    { name: "zere-mcp", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  const byName = new Map(tools.map((tool) => [tool.name, tool]));

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.input),
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    const tool = byName.get(name);
    if (!tool) {
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }

    const parsed = tool.input.safeParse(args);
    if (!parsed.success) {
      const issues = parsed.error.issues.map(
        (issue) => `${issue.path.join(".")}: ${issue.message}`,
      );
      throw new McpError(ErrorCode.InvalidParams, issues.join("; "));
    }

    try {
      return await tool.run(parsed.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ...text(message), isError: true };
    }
  });

  return server;
}
