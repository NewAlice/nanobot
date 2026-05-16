import { Menu, Moon, PanelLeftOpen, Settings, Sun, Sparkles, ChevronDown, Search} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";


// 可搜索 + 可滚动 + 自动按字母排序 技能下拉
function SkillDropdown({
  currentSkill,
  availableSkills,
  onSkillSelect
}: {
  currentSkill: string | null;
  availableSkills: string[];
  onSkillSelect: (s: string | null) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // 固定要放在前面的技能
  const pinnedSkills = [
    "ferdinand-marcos-skills",
    "spokesperson-agent-skill",
    "sara-duterte-skill",
    "enrique-manalo-skill",
    "gilberto-teodoro-skill",
    "cristina-aldeguer-roque-skill",
    "martin-romualdez-skill",
    "leni-robredo-skill",
  ];

  // 1. 搜索过滤
  let filtered = availableSkills.filter((skill) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return skill.toLowerCase().includes(q);
  });

  // 2. 拆分：固定项 + 其他项
  const pinnedInFiltered = pinnedSkills.filter(s => filtered.includes(s));
  const otherSkills = filtered
    .filter(s => !pinnedSkills.includes(s))
    .sort((a, b) => a.localeCompare(b, "zh-CN"));

  // 3. 最终顺序：固定在前 → 其他排序在后
  const finalSkills = [...pinnedInFiltered, ...otherSkills];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[12px] font-medium text-muted-foreground hover:bg-accent/35 hover:text-foreground"
        >
          <Sparkles className="h-3 w-3 text-blue-500/80" />
          <span className="truncate uppercase tracking-wider text-[11px]">
            {currentSkill || "Default"}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-40 max-h-[60vh] overflow-y-auto overflow-x-hidden p-2 shadow-xl border-accent/50"
      >
        {/* 搜索框 */}
        <div className="flex items-center gap-2 border-b border-accent/30 pb-2 mb-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索技能..."
            className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-muted-foreground/70"
          />
        </div>

        {/* 固定第 1 项：默认助手 */}
        <DropdownMenuItem
          onClick={() => onSkillSelect(null)}
          className="flex items-center justify-between text-[12px] cursor-pointer border-b border-accent/30 pb-2 mb-1"
        >
          <span className={cn(!currentSkill && "font-bold text-blue-500")}>默认助手 (无技能)</span>
          {!currentSkill && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
        </DropdownMenuItem>

        {/* 排序后的技能列表 */}
        {finalSkills.length > 0 ? (
          finalSkills.map((skill) => (
            <DropdownMenuItem
              key={skill}
              onClick={() => onSkillSelect(skill)}
              className="flex items-center justify-between text-[12px] cursor-pointer py-1.5"
            >
              <span className={cn(currentSkill === skill && "font-bold text-foreground")}>{skill}</span>
              {currentSkill === skill && <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="text-[12px] text-muted-foreground py-2 text-center">未找到技能</div>
        )}
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
