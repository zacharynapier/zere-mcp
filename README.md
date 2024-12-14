# zere-mcp

A tiny, typed starting point for model context protocol servers.

A stdio server, one `defineTool` helper, and tools whose inputs are described
once with zod and checked at both compile time and runtime. Nothing hides the
protocol and there's no boilerplate to dig through. Clone it, delete the example
tools, and start writing your own.

## Usage

```sh
npm install
npm run build
npm start
```

During development, run straight from source:

```sh
npm run dev
```

The server speaks MCP over stdio, so it is meant to be launched by a client
rather than used interactively. To poke at it by hand, build and open the
[MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```sh
npm run build
npm run inspect
```

## Connecting a client

Point any MCP client at the built entry point. For Claude Desktop, add this to
`claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "zere": {
      "command": "node",
      "args": ["/absolute/path/to/zere-mcp/dist/index.js"]
    }
  }
}
```

## Adding a tool

Create a file in `src/tools`:

```ts
import { z } from "zod";
import { defineTool, text } from "../tool.js";

export const greet = defineTool({
  name: "greet",
  description: "Greet someone by name.",
  input: z.object({
    name: z.string(),
  }),
  run: ({ name }) => text(`Hello, ${name}.`),
});
```

Then add it to the list in `src/tools/index.ts`:

```ts
export const tools = [add, currentTime, greet];
```

The zod schema is converted to JSON Schema for `tools/list`, and incoming
arguments are validated against it before `run` is called, so `run` always
receives typed, parsed input.

## Layout

```
src/
  index.ts        entry point, connects the stdio transport
  server.ts       registers tools with the MCP server
  tool.ts         defineTool and the text result helper
  tools/
    index.ts      the list of tools the server exposes
    add.ts
    time.ts
```

## License

MIT
