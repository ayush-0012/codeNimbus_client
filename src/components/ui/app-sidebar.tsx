import {
  Users,
  Clock,
  Folder,
  Trash2,
  Share2,
  Cog,
  FileText,
  FolderOpen,
  GitFork,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-black text-white text-sm">
        <SidebarGroup>
          <SidebarHeader className="px-4 py-3 mb-6 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border border-zinc-700"></div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-white">username</span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarGroupContent>
            {/* SECTION: General */}
            <SidebarMenu>
              {[
                { icon: Clock, label: "Recent" },
                { icon: Cog, label: "Settings" },
                { icon: Users, label: "Invite members" },
                { icon: FileText, label: "Get started" },
              ].map(({ icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton className="gap-2 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-md px-2 py-1.5 transition cursor-pointer text-lg">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* SECTION: Repositories */}
            <div className="mt-5 px-4 py-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Repositories
              </h3>
            </div>
            <SidebarMenu>
              {[
                { icon: FolderOpen, label: "All repositories" },
                { icon: GitFork, label: "My contributions" },
              ].map(({ icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton className="gap-2 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-md px-2 py-1.5 transition cursor-pointer text-lg">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* SECTION: Devboxes and Sandboxes */}
            <div className="mt-5 px-4 py-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Devboxes and Sandboxes
              </h3>
            </div>
            <SidebarMenu>
              {[
                { icon: FileText, label: "Drafts" },
                { icon: Folder, label: "All folders" },
                { icon: Trash2, label: "Recently deleted" },
              ].map(({ icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton className="gap-2 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-md px-2 py-1.5 transition cursor-pointer text-lg">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* SECTION: Shared */}
            <div className="mt-5 px-4 py-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Shared
              </h3>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-2 text-zinc-200 hover:text-white hover:bg-zinc-800 rounded-md px-2 py-1.5 transition cursor-pointer text-lg">
                  <Share2 className="h-4 w-4" />
                  <span>Shared with me</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
