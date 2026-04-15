"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, History, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Article } from "@/lib/common/type";

export function AppSidebar({ articles }: { articles: Article[] }) {
  const [mounted, setMounted] = useState(false);

  // Fixes Hydration Mismatch by ensuring client-side render matches server
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        {/* <div className="flex items-center gap-2 font-semibold text-lg">
          <LayoutDashboard className="w-5 h-5 text-blue-600" />
          <span>Quiz AI</span>
        </div> */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <History className="w-4 h-4" />
            History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!mounted ? (
                // Skeleton or empty state during hydration
                <div className="px-4 py-2 space-y-2">
                  <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
                </div>
              ) : articles.length > 0 ? (
                articles.map((article) => (
                  <SidebarMenuItem key={article.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/dashboard/${article.id}`}>
                        <FileText className="shrink-0" />
                        <span className="truncate">{article.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <span className="px-4 py-2 text-xs text-muted-foreground italic block">
                    No articles yet
                  </span>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Quiz App v1.0
      </SidebarFooter>
    </Sidebar>
  );
}
