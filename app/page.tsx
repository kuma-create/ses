import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MetricCard } from "@/components/ui/metric-card"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Briefcase,
  Users,
  UserCheck,
  TrendingUp,
  Calendar,
  ArrowRight,
  Plus,
  Sparkles,
  Activity,
  Clock,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="lg:ml-72 pt-16 lg:pt-0 overflow-visible relative z-0">
        <div className="p-4 lg:p-6 space-y-6 lg:space-y-8 fade-in">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ダッシュボード
                </h1>
              </div>
              <p className="text-muted-foreground text-sm lg:text-lg">
                プラットフォームの概要と最新の活動を確認できます
              </p>
            </div>
            <Button className="gap-2 button-hover shadow-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary w-full lg:w-auto text-white">
              <Plus className="h-4 w-4" />
              新規案件作成
            </Button>
          </div>

          <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="総案件数"
              value="124"
              change={{ value: "+12% 先月比", trend: "up" }}
              icon={<Briefcase className="h-5 w-5" />}
            />
            <MetricCard
              title="登録人材数"
              value="2,847"
              change={{ value: "+8% 先月比", trend: "up" }}
              icon={<Users className="h-5 w-5" />}
            />
            <MetricCard
              title="成約件数"
              value="89"
              change={{ value: "+23% 先月比", trend: "up" }}
              icon={<UserCheck className="h-5 w-5" />}
            />
            <MetricCard
              title="成約率"
              value="71.8%"
              change={{ value: "+5.2% 先月比", trend: "up" }}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>

          <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2">
            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">最近の案件</CardTitle>
                    <CardDescription className="text-muted-foreground">新しく登録された案件一覧</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Reactフロントエンド開発",
                    company: "株式会社テックイノベーション",
                    budget: "¥800,000",
                    status: "募集中",
                    date: "2024年1月15日",
                    urgency: "高",
                  },
                  {
                    title: "バックエンドAPI設計・開発",
                    company: "デジタルソリューションズ",
                    budget: "¥1,200,000",
                    status: "進行中",
                    date: "2024年1月14日",
                    urgency: "中",
                  },
                  {
                    title: "モバイルアプリUI/UX改善",
                    company: "スタートアップX",
                    budget: "¥600,000",
                    status: "募集中",
                    date: "2024年1月13日",
                    urgency: "低",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 border border-border/50 rounded-xl bg-background/50 hover:bg-background/80 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.urgency === "高"
                              ? "bg-red-500"
                              : project.urgency === "中"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{project.company}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {project.date}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-bold text-lg text-foreground">{project.budget}</div>
                      <StatusBadge status={project.status} />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-background/50 hover:bg-background border-border/50 button-hover"
                >
                  すべての案件を見る
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Activity className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">マッチング進行状況</CardTitle>
                    <CardDescription className="text-muted-foreground">現在進行中のマッチング案件</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    project: "ECサイトリニューアル",
                    talent: "田中 太郎",
                    progress: 75,
                    status: "面談調整中",
                    timeRemaining: "3日",
                    priority: "高",
                  },
                  {
                    project: "データ分析システム構築",
                    talent: "佐藤 花子",
                    progress: 50,
                    status: "提案書作成中",
                    timeRemaining: "5日",
                    priority: "中",
                  },
                  {
                    project: "セキュリティ監査",
                    talent: "山田 次郎",
                    progress: 90,
                    status: "契約準備中",
                    timeRemaining: "1日",
                    priority: "高",
                  },
                ].map((match, index) => (
                  <div
                    key={index}
                    className="group space-y-3 p-4 border border-border/50 rounded-xl bg-background/50 hover:bg-background/80 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                            {match.project}
                          </h4>
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              match.priority === "高" ? "bg-red-500" : "bg-yellow-500"
                            }`}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">担当: {match.talent}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>残り{match.timeRemaining}</span>
                        </div>
                      </div>
                      <StatusBadge status={match.status} className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">進捗</span>
                        <span className="font-medium text-foreground">{match.progress}%</span>
                      </div>
                      <Progress
                        value={match.progress}
                        className={`h-2 bg-muted ${
                          match.progress >= 80
                            ? "[&>div]:bg-green-500"
                            : match.progress >= 50
                              ? "[&>div]:bg-yellow-500"
                              : "[&>div]:bg-red-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-background/50 hover:bg-background border-border/50 button-hover"
                >
                  マッチング一覧を見る
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-bold">クイックアクション</CardTitle>
              <CardDescription>よく使用される機能への素早いアクセス</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "新規案件", icon: <Plus className="h-5 w-5" />, color: "bg-primary hover:bg-primary/90" },
                  {
                    label: "人材検索",
                    icon: <Users className="h-5 w-5" />,
                    color: "bg-secondary hover:bg-secondary/90",
                  },
                  {
                    label: "マッチング",
                    icon: <UserCheck className="h-5 w-5" />,
                    color: "bg-accent hover:bg-accent/90",
                  },
                  { label: "レポート", icon: <TrendingUp className="h-5 w-5" />, color: "bg-muted hover:bg-muted/90" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-20 flex-col gap-2 ${action.color} text-white border-0 transition-all duration-200 hover:scale-105`}
                  >
                    {action.icon}
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
