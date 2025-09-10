"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Briefcase, Users, UserCheck, Settings, Menu, Building2, Sparkles } from "lucide-react"

const navigation = [
  {
    name: "ダッシュボード",
    href: "/",
    icon: LayoutDashboard,
    description: "概要と統計情報を確認",
  },
  {
    name: "案件管理",
    href: "/projects",
    icon: Briefcase,
    description: "案件の作成、編集、管理を行います",
  },
  {
    name: "人材管理",
    href: "/talents",
    icon: Users,
    description: "人材の登録と管理",
  },
  {
    name: "マッチング",
    href: "/matching",
    icon: UserCheck,
    description: "案件と人材のマッチング",
  },
  {
    name: "設定",
    href: "/settings",
    icon: Settings,
    description: "システム設定",
  },
]

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-sidebar to-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50">
      <div className="flex h-16 items-center border-b border-sidebar-border/50 px-4 bg-sidebar/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 font-bold text-sidebar-foreground group">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-200">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TalentMatch
            </span>
            <Sparkles className="h-4 w-4 text-primary/60" />
          </div>
        </Link>
      </div>
      <div className="flex-1 px-2 py-6 overflow-visible">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "sidebar-link flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-105 hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-lg transition-colors duration-200",
                    isActive ? "bg-white/20" : "bg-transparent group-hover:bg-sidebar-primary/10",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span
                    className={cn(
                      "sidebar-description text-xs transition-colors duration-200",
                      isActive ? "text-white/90" : "text-muted-foreground",
                    )}
                  >
                    {item.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-sidebar-border/50 bg-sidebar/80 backdrop-blur-sm">
        <div className="text-xs text-sidebar-foreground/60 text-center">
          <p className="font-medium">TalentMatch Pro</p>
          <p>v2.1.0</p>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <>
      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>

      {/* モバイルサイドバー */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">サイドバーを開く</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 z-[60]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
