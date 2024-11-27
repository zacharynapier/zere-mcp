#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "zere-mcp", version: "0.1.0" },
  { capabilities: {} },
);

await server.connect(new StdioServerTransport());
