import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { mockMatches, mockProjects, mockTalents } from "@/lib/mock-data"
import { ArrowLeft, Calendar, Edit, Share2, Mail, Phone, CheckCircle, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

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

const timelineIcons = {
  proposed: CheckCircle,
  interview_scheduled: Calendar,
  interview_completed: CheckCircle,
  contract_sent: Mail,
  contract_signed: CheckCircle,
  project_started: Clock,
  project_completed: CheckCircle,
  note_added: MessageSquare,
}

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const match = mockMatches.find((m) => m.id === params.id)

  if (!match) {
    notFound()
  }

  const project = mockProjects.find((p) => p.id === match.projectId)
  const talent = mockTalents.find((t) => t.id === match.talentId)

  if (!project || !talent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="lg:pl-72">
        <div className="p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/matching">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <Badge variant={statusColors[match.status]}>{statusLabels[match.status]}</Badge>
              </div>
              <p className="text-muted-foreground">
                {project.company} × {talent.name}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                編集
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">概要</TabsTrigger>
                  <TabsTrigger value="timeline">進捗</TabsTrigger>
                  <TabsTrigger value="communication">コミュニケーション</TabsTrigger>
                  <TabsTrigger value="documents">書類</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* マッチング概要 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>マッチング概要</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* 案件情報 */}
                        <div className="space-y-3">
                          <h4 className="font-medium">案件情報</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">案件名:</span> {project.title}
                            </div>
                            <div>
                              <span className="font-medium">会社:</span> {project.company}
                            </div>
                            <div>
                              <span className="font-medium">予算:</span> ¥{project.budget.toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">期間:</span> {project.duration}
                            </div>
                            <div>
                              <span className="font-medium">勤務形態:</span> {project.workStyle}
                            </div>
                          </div>
                        </div>

                        {/* 人材情報 */}
                        <div className="space-y-3">
                          <h4 className="font-medium">人材情報</h4>
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${talent.name}`}
                              />
                              <AvatarFallback>{talent.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{talent.name}</div>
                              <div className="text-sm text-muted-foreground">{talent.title}</div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">経験:</span> {talent.experience}年
                            </div>
                            <div>
                              <span className="font-medium">時間単価:</span> ¥{talent.hourlyRate.toLocaleString()}/時
                            </div>
                            <div>
                              <span className="font-medium">稼働状況:</span> {talent.availability}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* マッチ度 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">マッチ度</h4>
                          <span className="text-lg font-bold text-primary">{match.matchScore}%</span>
                        </div>
                        <Progress value={match.matchScore} className="h-3" />
                        <div className="grid gap-3 md:grid-cols-2 text-sm">
                          <div>
                            <span className="font-medium text-green-600">マッチするスキル:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {project.requiredSkills
                                .filter((skill) => talent.skills.includes(skill))
                                .map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs border-green-200 text-green-700"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-orange-600">不足スキル:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {project.requiredSkills
                                .filter((skill) => !talent.skills.includes(skill))
                                .map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs border-orange-200 text-orange-700"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {match.notes && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium">メモ</h4>
                            <p className="text-sm text-muted-foreground">{match.notes}</p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>進捗タイムライン</CardTitle>
                      <CardDescription>マッチングの進行状況を時系列で表示しています</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {match.timeline.map((event, index) => {
                          const Icon = timelineIcons[event.type] || CheckCircle
                          return (
                            <div key={event.id} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                {index < match.timeline.length - 1 && <div className="h-8 w-px bg-border mt-2" />}
                              </div>
                              <div className="flex-1 space-y-1 pb-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(event.createdAt).toLocaleDateString("ja-JP")}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                                <p className="text-xs text-muted-foreground">作成者: {event.createdBy}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="communication" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>コミュニケーション履歴</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center text-muted-foreground py-8">
                          コミュニケーション履歴はまだありません
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-medium">新しいメッセージ</h4>
                          <Textarea placeholder="メッセージを入力してください..." />
                          <Button size="sm">送信</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>関連書類</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-muted-foreground py-8">関連書類はまだありません</div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* ステータス管理 */}
              <Card>
                <CardHeader>
                  <CardTitle>ステータス管理</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>現在のステータス</span>
                      <Badge variant={statusColors[match.status]}>{statusLabels[match.status]}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>提案日</span>
                      <span>{new Date(match.proposedAt).toLocaleDateString("ja-JP")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>最終更新</span>
                      <span>{new Date(match.updatedAt).toLocaleDateString("ja-JP")}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      面談を設定
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      契約書を送信
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      ステータス更新
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 連絡先 */}
              <Card>
                <CardHeader>
                  <CardTitle>連絡先</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">案件担当者</h4>
                    <div className="text-sm">
                      <div>{project.contactPerson}</div>
                      <div className="text-muted-foreground">{project.contactEmail}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">人材</h4>
                    <div className="text-sm">
                      <div>{talent.name}</div>
                      <div className="text-muted-foreground">{talent.email}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                      <Mail className="h-4 w-4" />
                      メール送信
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                      <Phone className="h-4 w-4" />
                      電話連絡
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* アクション */}
              <Card>
                <CardHeader>
                  <CardTitle>アクション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    マッチングを複製
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    レポート出力
                  </Button>
                  <Button className="w-full" variant="destructive" size="sm">
                    マッチングをキャンセル
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
