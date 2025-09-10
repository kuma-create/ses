import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockMatches, mockMatchSuggestions, mockProjects, mockTalents } from "@/lib/mock-data"
import { Search, Filter, Plus, Calendar, TrendingUp, Users, CheckCircle, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

const statusLabels = {
  proposed: "提案中",
  interview_scheduled: "面談予定",
  interview_completed: "面談完了",
  negotiating: "条件調整中",
  contracted: "契約済み",
  completed: "完了",
  cancelled: "キャンセル",
}

const statusColors = {
  proposed: "secondary",
  interview_scheduled: "default",
  interview_completed: "default",
  negotiating: "secondary",
  contracted: "default",
  completed: "secondary",
  cancelled: "destructive",
} as const

export default function MatchingPage() {
  const activeMatches = mockMatches.filter((m) =>
    ["proposed", "interview_scheduled", "interview_completed", "negotiating"].includes(m.status),
  )
  const contractedMatches = mockMatches.filter((m) => m.status === "contracted")
  const completedMatches = mockMatches.filter((m) => m.status === "completed")

  function MatchCard({ match }: { match: (typeof mockMatches)[0] }) {
    const project = mockProjects.find((p) => p.id === match.projectId)
    const talent = mockTalents.find((t) => t.id === match.talentId)

    if (!project || !talent) return null

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">
                <Link href={`/matching/${match.id}`} className="hover:text-primary">
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription>{project.company}</CardDescription>
            </div>
            <Badge variant={statusColors[match.status]}>{statusLabels[match.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${talent.name}`} />
              <AvatarFallback className="text-xs">{talent.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{talent.name}</div>
              <div className="text-xs text-muted-foreground">{talent.title}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>マッチ度</span>
              <span className="font-medium">{match.matchScore}%</span>
            </div>
            <Progress value={match.matchScore} className="h-2" />
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(match.proposedAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />¥{project.budget.toLocaleString()}
            </div>
          </div>

          {match.notes && <p className="text-sm text-muted-foreground line-clamp-2">{match.notes}</p>}

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              最終更新: {new Date(match.updatedAt).toLocaleDateString("ja-JP")}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/matching/${match.id}`}>詳細を見る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  function SuggestionCard({ suggestion }: { suggestion: (typeof mockMatchSuggestions)[0] }) {
    const project = mockProjects.find((p) => p.id === suggestion.projectId)
    const talent = mockTalents.find((t) => t.id === suggestion.talentId)

    if (!project || !talent) return null

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {project.title}
              </CardTitle>
              <CardDescription>{project.company}</CardDescription>
            </div>
            <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
              {suggestion.matchScore}% マッチ
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${talent.name}`} />
              <AvatarFallback className="text-xs">{talent.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{talent.name}</div>
              <div className="text-xs text-muted-foreground">{talent.title}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">マッチング理由</div>
            <ul className="text-sm text-muted-foreground space-y-1">
              {suggestion.reasons.slice(0, 2).map((reason, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1">
            {suggestion.skillMatches.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              マッチングを作成
            </Button>
            <Button variant="outline" size="sm">
              詳細
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="lg:ml-72">
        <div className="p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">マッチング管理</h1>
              <p className="text-muted-foreground">案件と人材のマッチング状況を管理します</p>
            </div>
            <Button className="gap-2" asChild>
              <Link href="/matching/new">
                <Plus className="h-4 w-4" />
                手動マッチング作成
              </Link>
            </Button>
          </div>

          {/* 統計カード */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総マッチング数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMatches.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">進行中</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{activeMatches.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">契約済み</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{contractedMatches.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">成約率</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
              </CardContent>
            </Card>
          </div>

          {/* 検索・フィルター */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="案件名、人材名で検索..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="ステータス" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="active">進行中</SelectItem>
                      <SelectItem value="contracted">契約済み</SelectItem>
                      <SelectItem value="completed">完了</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="マッチ度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="high">90%以上</SelectItem>
                      <SelectItem value="medium">70-89%</SelectItem>
                      <SelectItem value="low">70%未満</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* マッチング一覧 */}
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="suggestions">AI提案 ({mockMatchSuggestions.length})</TabsTrigger>
              <TabsTrigger value="active">進行中 ({activeMatches.length})</TabsTrigger>
              <TabsTrigger value="contracted">契約済み ({contractedMatches.length})</TabsTrigger>
              <TabsTrigger value="all">すべて ({mockMatches.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockMatchSuggestions.map((suggestion, index) => (
                  <SuggestionCard key={index} suggestion={suggestion} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contracted" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contractedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
