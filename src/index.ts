#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
import { tools } from "./tools/index.js";

const server = createServer(tools);

await server.connect(new StdioServerTransport());
