"use client";
import React from "react";
import useToolsStore from "@/stores/useToolsStore";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

export default function McpConfig() {
  const { mcpConfig, setMcpConfig } = useToolsStore();

  const handleClear = () => {
    setMcpConfig({
      server_label: "",
      server_url: "",
      allowed_tools: "",
      skip_approval: false,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-muted-fg text-sm">Server details</div>
        <div
          className="text-subtle-fg text-sm px-1 transition-colors hover:text-muted-fg cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </div>
      </div>
      <div className="mt-3 space-y-3 text-subtle-fg">
        <div className="flex items-center gap-2">
          <label htmlFor="server_label" className="text-sm w-24">
            Label
          </label>
          <Input
            id="server_label"
            type="text"
            placeholder="deepwiki"
            className="bg-surface-1 border-subtle text-sm flex-1 text-fg placeholder:text-muted-fg"
            value={mcpConfig.server_label}
            onChange={(e) =>
              setMcpConfig({ ...mcpConfig, server_label: e.target.value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="server_url" className="text-sm w-24">
            URL
          </label>
          <Input
            id="server_url"
            type="text"
            placeholder="https://example.com/mcp"
            className="bg-surface-1 border-subtle text-sm flex-1 text-fg placeholder:text-muted-fg"
            value={mcpConfig.server_url}
            onChange={(e) =>
              setMcpConfig({ ...mcpConfig, server_url: e.target.value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="allowed_tools" className="text-sm w-24">
            Allowed
          </label>
          <Input
            id="allowed_tools"
            type="text"
            placeholder="tool1,tool2"
            className="bg-surface-1 border-subtle text-sm flex-1 text-fg placeholder:text-muted-fg"
            value={mcpConfig.allowed_tools}
            onChange={(e) =>
              setMcpConfig({ ...mcpConfig, allowed_tools: e.target.value })
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="skip_approval" className="text-sm w-24">
            Skip approval
          </label>
          <Switch
            id="skip_approval"
            checked={mcpConfig.skip_approval}
            onCheckedChange={(checked) =>
              setMcpConfig({ ...mcpConfig, skip_approval: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
