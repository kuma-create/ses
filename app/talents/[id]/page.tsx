import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockTalents, mockProjects } from "@/lib/mock-data"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Edit,
  Share2,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const availabilityLabels = {
  available: "対応可能",
  busy: "多忙",
  unavailable: "対応不可",
}

const availabilityColors = {
  available: "default",
  busy: "secondary",
  unavailable: "outline",
} as const

const workStyleLabels = {
  remote: "リモート",
  onsite: "オンサイト",
  hybrid: "ハイブリッド",
}

export default function TalentDetailPage({ params }: { params: { id: string } }) {
  const talent = mockTalents.find((t) => t.id === params.id)

  if (!talent) {
    notFound()
  }

  // モック案件履歴データ
  const projectHistory = mockProjects.slice(0, 3).map((project, index) => ({
    ...project,
    status: index === 0 ? "completed" : index === 1 ? "active" : ("completed" as const),
    startDate: "2023-10-01",
    endDate: index === 1 ? undefined : "2023-12-31",
    rating: index === 0 ? 5 : 4,
  }))

  // スキル別の経験レベル（モック）
  const skillLevels = talent.skills.slice(0, 6).map((skill, index) => ({
    skill,
    level: Math.floor(Math.random() * 40) + 60, // 60-100%
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="lg:ml-72">
        <div className="p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/talents">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/abstract-geometric-shapes.png?height=64&width=64&query=${talent.name}`} />
                  <AvatarFallback className="text-lg">{talent.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight">{talent.name}</h1>
                    <Badge variant={availabilityColors[talent.availability]}>
                      {availabilityLabels[talent.availability]}
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground">{talent.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {talent.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workStyleLabels[talent.workStyle]}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {talent.experience}年経験
                    </div>
                  </div>
                </div>
              </div>
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
                  <TabsTrigger value="skills">スキル</TabsTrigger>
                  <TabsTrigger value="projects">案件履歴</TabsTrigger>
                  <TabsTrigger value="activity">活動履歴</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* プロフィール */}
                  <Card>
                    <CardHeader>
                      <CardTitle>プロフィール</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{talent.bio}</p>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">メール:</span>
                            <span className="text-primary">{talent.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">電話:</span>
                            <span>{talent.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">ポートフォリオ:</span>
                            <Link href={talent.portfolio} className="text-primary hover:underline" target="_blank">
                              {talent.portfolio}
                            </Link>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">登録日:</span>
                            <span>{new Date(talent.createdAt).toLocaleDateString("ja-JP")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">最終更新:</span>
                            <span>{new Date(talent.updatedAt).toLocaleDateString("ja-JP")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 基本スキル */}
                  <Card>
                    <CardHeader>
                      <CardTitle>保有スキル</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {talent.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>スキルレベル</CardTitle>
                      <CardDescription>各スキルの習熟度を表示しています</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {skillLevels.map((item) => (
                        <div key={item.skill} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{item.skill}</span>
                            <span className="text-sm text-muted-foreground">{item.level}%</span>
                          </div>
                          <Progress value={item.level} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  {projectHistory.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription>{project.company}</CardDescription>
                          </div>
                          <Badge variant={project.status === "active" ? "default" : "secondary"}>
                            {project.status === "active" ? "進行中" : "完了"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(project.startDate).toLocaleDateString("ja-JP")} -{" "}
                            {project.endDate ? new Date(project.endDate).toLocaleDateString("ja-JP") : "進行中"}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />¥{project.budget.toLocaleString()}
                          </div>
                          {project.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {project.rating}.0
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {project.requiredSkills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
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
              {/* 料金・稼働情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>料金・稼働情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">¥{talent.hourlyRate.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">時間単価</div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>稼働状況</span>
                      <Badge variant={availabilityColors[talent.availability]}>
                        {availabilityLabels[talent.availability]}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>勤務形態</span>
                      <span>{workStyleLabels[talent.workStyle]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>経験年数</span>
                      <span>{talent.experience}年</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 連絡先 */}
              <Card>
                <CardHeader>
                  <CardTitle>連絡先</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    メールを送信
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent">
                    <Phone className="h-4 w-4" />
                    電話をかける
                  </Button>
                  <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                    <Link href={talent.portfolio} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                      ポートフォリオ
                    </Link>
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
                    案件を提案
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    お気に入りに追加
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    メモを追加
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
