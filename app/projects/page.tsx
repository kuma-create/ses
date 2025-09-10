import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockProjects, mockExternalProjects } from "@/lib/mock-data"
import { Search, Filter, Send, Eye } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/ui/status-badge"

const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低",
}

const priorityColors = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
} as const

const workStyleLabels = {
  remote: "リモート",
  onsite: "オンサイト",
  hybrid: "ハイブリッド",
}

export default function ProjectsPage() {
  const allProjects = [...mockProjects, ...mockExternalProjects]
  const activeProjects = allProjects.filter((p) => p.status === "active")
  const externalProjects = mockExternalProjects

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 lg:pt-0 lg:pl-72">
        <div className="p-4 md:p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">案件を探す</h1>
              <p className="text-foreground/70">1-100件表示中 / 全{allProjects.length}件</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-background">
                <Search className="h-4 w-4" />
                案件を検索
              </Button>
              <Button className="gap-2 bg-primary text-black hover:bg-primary/90 hover:text-black" asChild>
                <Link href="/talents">
                  <Eye className="h-4 w-4" />
                  人材を見る
                </Link>
              </Button>
            </div>
          </div>

          {/* 検索・フィルター */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="案件名、会社名で検索..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="優先度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="勤務形態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="remote">リモート</SelectItem>
                      <SelectItem value="onsite">オンサイト</SelectItem>
                      <SelectItem value="hybrid">ハイブリッド</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 案件一覧テーブル */}
          <Tabs defaultValue="external" className="space-y-4">
            <TabsList>
              <TabsTrigger value="external">他社案件 ({externalProjects.length})</TabsTrigger>
              <TabsTrigger value="active">自社案件 ({activeProjects.length})</TabsTrigger>
              <TabsTrigger value="all">すべて ({allProjects.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="external" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>案件タイトル</TableHead>
                      <TableHead className="w-16">優先度</TableHead>
                      <TableHead className="w-24">単価（万円）</TableHead>
                      <TableHead className="w-20">期間</TableHead>
                      <TableHead>スキル</TableHead>
                      <TableHead className="w-20">年齢制限</TableHead>
                      <TableHead className="w-24">リモート</TableHead>
                      <TableHead className="w-24">開始時期</TableHead>
                      <TableHead className="w-24">置人事業主</TableHead>
                      <TableHead className="w-16">外国籍</TableHead>
                      <TableHead className="w-24">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {externalProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <Link href={`/projects/${project.id}`} className="font-medium hover:text-primary">
                              {project.title}
                            </Link>
                            <div className="text-xs text-muted-foreground">{project.createdAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={priorityColors[project.priority]} className="text-xs">
                            {priorityLabels[project.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.budget > 0 ? `${Math.floor(project.budget / 10000)}万円` : "-"}</TableCell>
                        <TableCell className="text-sm">{project.duration}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.requiredSkills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {project.requiredSkills.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.requiredSkills.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{project.ageRestriction || "-"}</TableCell>
                        <TableCell>
                          <StatusBadge status={project.workStyle} />
                        </TableCell>
                        <TableCell className="text-sm">{project.startDate}</TableCell>
                        <TableCell className="text-sm">{project.placementCompany}</TableCell>
                        <TableCell>
                          <Badge variant={project.foreignNationalAllowed ? "default" : "secondary"} className="text-xs">
                            {project.foreignNationalAllowed ? "可" : "不可"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" className="gap-1 text-xs">
                            <Send className="h-3 w-3" />
                            提案する
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>案件タイトル</TableHead>
                      <TableHead className="w-16">優先度</TableHead>
                      <TableHead className="w-24">単価（万円）</TableHead>
                      <TableHead className="w-20">期間</TableHead>
                      <TableHead>スキル</TableHead>
                      <TableHead className="w-20">年齢制限</TableHead>
                      <TableHead className="w-24">リモート</TableHead>
                      <TableHead className="w-24">開始時期</TableHead>
                      <TableHead className="w-24">置人事業主</TableHead>
                      <TableHead className="w-16">外国籍</TableHead>
                      <TableHead className="w-24">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <Link href={`/projects/${project.id}`} className="font-medium hover:text-primary">
                              {project.title}
                            </Link>
                            <div className="text-xs text-muted-foreground">{project.createdAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={priorityColors[project.priority]} className="text-xs">
                            {priorityLabels[project.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.budget > 0 ? `${Math.floor(project.budget / 10000)}万円` : "-"}</TableCell>
                        <TableCell className="text-sm">{project.duration}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.requiredSkills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {project.requiredSkills.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.requiredSkills.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{project.ageRestriction || "-"}</TableCell>
                        <TableCell>
                          <StatusBadge status={project.workStyle} />
                        </TableCell>
                        <TableCell className="text-sm">{project.startDate}</TableCell>
                        <TableCell className="text-sm">{project.placementCompany}</TableCell>
                        <TableCell>
                          <Badge variant={project.foreignNationalAllowed ? "default" : "secondary"} className="text-xs">
                            {project.foreignNationalAllowed ? "可" : "不可"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="gap-1 text-xs bg-transparent">
                            <Eye className="h-3 w-3" />
                            詳細
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>案件タイトル</TableHead>
                      <TableHead className="w-16">優先度</TableHead>
                      <TableHead className="w-24">単価（万円）</TableHead>
                      <TableHead className="w-20">期間</TableHead>
                      <TableHead>スキル</TableHead>
                      <TableHead className="w-20">年齢制限</TableHead>
                      <TableHead className="w-24">リモート</TableHead>
                      <TableHead className="w-24">開始時期</TableHead>
                      <TableHead className="w-24">置人事業主</TableHead>
                      <TableHead className="w-16">外国籍</TableHead>
                      <TableHead className="w-24">アクション</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProjects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <Link href={`/projects/${project.id}`} className="font-medium hover:text-primary">
                              {project.title}
                            </Link>
                            <div className="text-xs text-muted-foreground">{project.createdAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={priorityColors[project.priority]} className="text-xs">
                            {priorityLabels[project.priority]}
                          </Badge>
                        </TableCell>
                        <TableCell>{project.budget > 0 ? `${Math.floor(project.budget / 10000)}万円` : "-"}</TableCell>
                        <TableCell className="text-sm">{project.duration}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.requiredSkills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {project.requiredSkills.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.requiredSkills.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{project.ageRestriction || "-"}</TableCell>
                        <TableCell>
                          <StatusBadge status={project.workStyle} />
                        </TableCell>
                        <TableCell className="text-sm">{project.startDate}</TableCell>
                        <TableCell className="text-sm">{project.placementCompany}</TableCell>
                        <TableCell>
                          <Badge variant={project.foreignNationalAllowed ? "default" : "secondary"} className="text-xs">
                            {project.foreignNationalAllowed ? "可" : "不可"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {project.isExternal ? (
                            <Button size="sm" className="gap-1 text-xs">
                              <Send className="h-3 w-3" />
                              提案する
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="gap-1 text-xs bg-transparent">
                              <Eye className="h-3 w-3" />
                              詳細
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          {/* ページネーション */}
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              前へ
            </Button>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button key={page} variant={page === 1 ? "default" : "outline"} size="sm" className="w-8 h-8">
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              次へ
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
