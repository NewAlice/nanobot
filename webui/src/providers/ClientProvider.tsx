import { createContext, useContext, type ReactNode } from "react";

import type { NanobotClient } from "@/lib/nanobot-client";

interface ClientContextValue {
  client: NanobotClient;
  token: string;
  modelName: string | null;
  skillName: string | null;
  availableSkills: string[];
}

const ClientContext = createContext<ClientContextValue | null>(null);

export function ClientProvider({
  client,
  token,
  modelName = null,
  skillName = null,
  availableSkills = [],
  children,
}: {
  client: NanobotClient;
  token: string;
  modelName?: string | null;
  skillName?: string | null; // 👈 新增类型声明
  availableSkills?: string[];
  children: ReactNode;
}) {
  return (
    <ClientContext.Provider value={{ client, token, modelName, skillName, availableSkills }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient(): ClientContextValue {
  const ctx = useContext(ClientContext);
  if (!ctx) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return ctx;
}
