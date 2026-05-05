import { PanelLeftOpen, Sparkles, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThreadHeaderProps {
  title: string;
  onToggleSidebar: () => void;
  onGoHome: () => void;
  hideSidebarToggleOnDesktop?: boolean;
  // --- 新增 Props ---
  currentSkill: string | null;
  onSkillSelect: (skillName: string | null) => void;
  availableSkills?: string[];
}

export function ThreadHeader({
  title,
  onToggleSidebar,
  onGoHome,
  hideSidebarToggleOnDesktop = false,
  currentSkill,
  onSkillSelect,
  availableSkills = [],
}: ThreadHeaderProps) {
  console.log("真实技能列表:", availableSkills)
  const { t } = useTranslation();
  return (
    <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-2">
      <div className="relative flex min-w-0 items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("thread.header.toggleSidebar")}
          onClick={onToggleSidebar}
          className={cn(
            "h-7 w-7 rounded-md text-muted-foreground hover:bg-accent/35 hover:text-foreground",
            hideSidebarToggleOnDesktop && "lg:pointer-events-none lg:opacity-0",
          )}
        >
          <PanelLeftOpen className="h-3.5 w-3.5" />
        </Button>
        <button
          type="button"
          onClick={onGoHome}
          className="flex min-w-0 items-center gap-2 rounded-md px-1.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent/35 hover:text-foreground"
        >
          <img
            src="/brand/nanobot_icon.png"
            alt=""
            className="h-4 w-4 rounded-[5px] opacity-85"
            aria-hidden
          />
          <span className="max-w-[min(60vw,32rem)] truncate">{title}</span>
        </button>

        {/* 分隔符 */}
        <span className="text-muted-foreground/30 text-[10px]">/</span>

        {/* --- 技能选择下拉框 --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent/35 hover:text-foreground"
            >
              <Sparkles className="h-3 w-3 text-blue-500/80" />
              <span className="truncate uppercase tracking-wider">
                {currentSkill || "Default"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40 shadow-xl border-accent/50">
            {/* --- 新增：取消/清除选项 --- */}
            <DropdownMenuItem
                onClick={() => onSkillSelect(null)} // 传 null 代表取消
                className="flex items-center justify-between text-[12px] cursor-pointer border-b border-accent/30 pb-2 mb-1"
            >
                <span className={cn(!currentSkill && "font-bold text-blue-500")}>
                    默认助手 (无技能)
                </span>
                {!currentSkill && (
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
            </DropdownMenuItem>
            {availableSkills?.map((skill) => (
              <DropdownMenuItem
                key={skill}
                onClick={() => onSkillSelect(skill)}
                className="flex items-center justify-between text-[12px] cursor-pointer"
              >
                <span className={cn(currentSkill === skill && "font-bold text-foreground")}>
                  {skill}
                </span>
                {currentSkill === skill && (
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-4" />
    </div>
  );
}
