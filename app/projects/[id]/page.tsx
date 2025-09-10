import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockProjects, mockTalents } from "@/lib/mock-data"
import { ArrowLeft, MapPin, Clock, Users, Edit, Share2, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const statusLabels = {
  draft: "下書き",
  active: "募集中",
  paused: "一時停止",
  completed: "完了",
  cancelled: "キャンセル",
}

const statusColors = {
  draft: "secondary",
  active: "default",
  paused: "outline",
  completed: "secondary",
  cancelled: "destructive",
} as const

const workStyleLabels = {
  remote: "リモート",
  onsite: "オンサイト",
  hybrid: "ハイブリッド",
}

const experienceLevelLabels = {
  junior: "ジュニア（1-2年）",
  mid: "ミドル（3-5年）",
  senior: "シニア（5-8年）",
  expert: "エキスパート（8年以上）",
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  // モック応募者データ
  const applicants = mockTalents.slice(0, 2).map((talent, index) => ({
    ...talent,
    applicationStatus: index === 0 ? "interview" : ("pending" as const),
    appliedAt: "2024-01-16",
    message: `${project.title}の案件に興味があります。私の経験とスキルが貴社のプロジェクトに貢献できると考えています。`,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="lg:ml-72">
        <div className="p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                <Badge variant={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
              </div>
              <p className="text-muted-foreground">{project.company}</p>
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
                  <TabsTrigger value="applicants">応募者 ({applicants.length})</TabsTrigger>
                  <TabsTrigger value="activity">活動履歴</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* 案件詳細 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>案件詳細</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{project.description}</p>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">勤務形態:</span>
                            <span>{workStyleLabels[project.workStyle]}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">期間:</span>
                            <span>{project.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">経験レベル:</span>
                            <span>{experienceLevelLabels[project.experienceLevel]}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">開始予定:</span>
                            <span>{new Date(project.startDate).toLocaleDateString("ja-JP")}</span>
                          </div>
                          {project.endDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">終了予定:</span>
                              <span>{new Date(project.endDate).toLocaleDateString("ja-JP")}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">勤務地:</span>
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* スキル要件 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>スキル要件</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">必須スキル</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="default">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">歓迎スキル</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.preferredSkills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applicants" className="space-y-4">
                  {applicants.map((applicant) => (
                    <Card key={applicant.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${applicant.name}`}
                              />
                              <AvatarFallback>{applicant.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{applicant.name}</CardTitle>
                              <CardDescription>{applicant.title}</CardDescription>
                            </div>
                          </div>
                          <Badge variant={applicant.applicationStatus === "interview" ? "default" : "secondary"}>
                            {applicant.applicationStatus === "interview" ? "面談予定" : "審査中"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">{applicant.message}</p>

                        <div className="flex flex-wrap gap-2">
                          {applicant.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="text-sm text-muted-foreground">
                            応募日: {new Date(applicant.appliedAt).toLocaleDateString("ja-JP")}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              詳細を見る
                            </Button>
                            <Button size="sm">面談設定</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-muted-foreground">活動履歴はまだありません</div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* 予算・統計 */}
              <Card>
                <CardHeader>
                  <CardTitle>案件情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">¥{project.budget.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">予算</div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">{project.applicantCount}</div>
                      <div className="text-xs text-muted-foreground">応募者数</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{project.viewCount}</div>
                      <div className="text-xs text-muted-foreground">閲覧数</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 連絡先 */}
              <Card>
                <CardHeader>
                  <CardTitle>担当者情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">担当者:</span>
                    <span>{project.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs break-all">{project.contactEmail}</span>
                  </div>
                  <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                    <Mail className="h-4 w-4" />
                    連絡する
                  </Button>
                </CardContent>
              </Card>

              {/* アクション */}
              <Card>
                <CardHeader>
                  <CardTitle>アクション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-transparent" variant="outline">
                    案件を複製
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    案件を一時停止
                  </Button>
                  <Button className="w-full" variant="destructive">
                    案件を削除
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
