import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

const statusConfig = {
  募集中: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white border-0" },
  進行中: { variant: "default" as const, className: "bg-blue-600 hover:bg-blue-700 text-white border-0" },
  完了: { variant: "secondary" as const, className: "bg-gray-600 hover:bg-gray-700 text-white border-0" },
  一時停止: {
    variant: "outline" as const,
    className: "border-yellow-600 text-yellow-700 bg-yellow-50 hover:bg-yellow-100",
  },
  稼働中: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700 text-white border-0" },
  待機中: { variant: "secondary" as const, className: "bg-gray-600 hover:bg-gray-700 text-white border-0" },
  面談調整中: { variant: "default" as const, className: "bg-orange-600 hover:bg-orange-700 text-white border-0" },
  提案書作成中: { variant: "default" as const, className: "bg-purple-600 hover:bg-purple-700 text-white border-0" },
  契約準備中: { variant: "default" as const, className: "bg-indigo-600 hover:bg-indigo-700 text-white border-0" },
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    variant: "default" as const,
    className: "bg-gray-600 text-white border-0",
  }

  return (
    <Badge variant={variant || config.variant} className={cn(config.className, className)}>
      {status}
    </Badge>
  )
}
