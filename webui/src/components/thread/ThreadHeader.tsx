import { Menu, Moon, PanelLeftOpen, Settings, Sun, Sparkles, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. 抽离技能下拉菜单组件（由你新增，抽离后对原文件结构破坏最小）
function SkillDropdown({
  currentSkill,
  availableSkills,
  onSkillSelect
}: {
  currentSkill: string | null;
  availableSkills: string[];
  onSkillSelect: (s: string | null) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent/35 hover:text-foreground"
        >
          <Sparkles className="h-3 w-3 text-blue-500/80" />
          <span className="truncate uppercase tracking-wider text-[11px]">
            {currentSkill || "Default"}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40 shadow-xl border-accent/50">
        <DropdownMenuItem
          onClick={() => onSkillSelect(null)}
          className="flex items-center justify-between text-[12px] cursor-pointer border-b border-accent/30 pb-2 mb-1"
        >
          <span className={cn(!currentSkill && "font-bold text-blue-500")}>默认助手 (无技能)</span>
          {!currentSkill && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
        </DropdownMenuItem>
        {availableSkills?.map((skill) => (
          <DropdownMenuItem
            key={skill}
            onClick={() => onSkillSelect(skill)}
            className="flex items-center justify-between text-[12px] cursor-pointer"
          >
            <span className={cn(currentSkill === skill && "font-bold text-foreground")}>{skill}</span>
            {currentSkill === skill && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ThreadHeaderProps {
  title: string;
  onToggleSidebar: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  // --- 新增 Props ---
  hideSidebarToggleOnDesktop?: boolean;
  currentSkill: string | null;
  onSkillSelect: (skillName: string | null) => void;
  availableSkills?: string[];
  minimal?: boolean;
}

export function ThreadHeader({
  title,
  onToggleSidebar,
  theme,
  onToggleTheme,
  onOpenSettings,
  hideSidebarToggleOnDesktop = false,
  currentSkill,
  onSkillSelect,
  availableSkills = [],
  minimal = false,
}: ThreadHeaderProps) {
  const { t } = useTranslation();

  if (minimal) {
    return (
      <div className="relative z-10 flex h-11 items-center justify-between gap-3 px-3 py-2">
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
          <Menu className="h-3.5 w-3.5" />
        </Button>
        {/* 1. 紧跟在第一个按钮后插入，不添加额外的包裹 div */}
        <SkillDropdown
          currentSkill={currentSkill}
          availableSkills={availableSkills}
          onSkillSelect={onSkillSelect}
        />
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("thread.header.toggleTheme")}
            onClick={onToggleTheme}
            className="h-8 w-8 rounded-full text-muted-foreground/85 hover:bg-accent/40 hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("thread.header.settings")}
            onClick={onOpenSettings}
            className="h-8 w-8 rounded-full text-muted-foreground/85 hover:bg-accent/40 hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="flex min-w-0 items-center rounded-md px-1.5 py-1 text-[12px] font-medium text-muted-foreground">
          <span className="max-w-[min(60vw,32rem)] truncate">{title}</span>
        </div>

        <span className="text-muted-foreground/30 text-[10px]">/</span>
        {/* 2. 对话页模式，同样只在这里插入一行 */}
        <SkillDropdown
          currentSkill={currentSkill}
          availableSkills={availableSkills}
          onSkillSelect={onSkillSelect}
        />
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("thread.header.toggleTheme")}
          onClick={onToggleTheme}
          className="h-8 w-8 rounded-full text-muted-foreground/85 hover:bg-accent/40 hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("thread.header.settings")}
          onClick={onOpenSettings}
          className="h-8 w-8 rounded-full text-muted-foreground/85 hover:bg-accent/40 hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-4" />
    </div>
  );
}
