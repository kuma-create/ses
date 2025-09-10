"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockProjects, mockTalents } from "@/lib/mock-data"
import { ArrowLeft, Search, Sparkles, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ProposalGenerator } from "@/components/proposal-generator"

export default function NewMatchingPage() {
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedTalent, setSelectedTalent] = useState<string>("")
  const [searchProject, setSearchProject] = useState("")
  const [searchTalent, setSearchTalent] = useState("")
  const [showProposal, setShowProposal] = useState(false)

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchProject.toLowerCase()) ||
      project.company.toLowerCase().includes(searchProject.toLowerCase()),
  )

  const filteredTalents = mockTalents.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchTalent.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTalent.toLowerCase()),
  )

  const project = mockProjects.find((p) => p.id === selectedProject)
  const talent = mockTalents.find((t) => t.id === selectedTalent)

  // 簡単なマッチ度計算
  const calculateMatchScore = () => {
    if (!project || !talent) return 0

    const skillMatches = project.requiredSkills.filter((skill) => talent.skills.includes(skill)).length
    const totalSkills = project.requiredSkills.length
    const skillScore = (skillMatches / totalSkills) * 100

    // 経験レベルマッチング
    const experienceScore = talent.experience >= 3 ? 20 : 10

    // 勤務形態マッチング
    const workStyleScore = project.workStyle === talent.workStyle ? 10 : 5

    return Math.min(100, Math.round(skillScore * 0.7 + experienceScore + workStyleScore))
  }

  const matchScore = calculateMatchScore()

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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">手動マッチング作成</h1>
              <p className="text-muted-foreground">案件と人材を手動でマッチングします</p>
            </div>
          </div>

          {showProposal && project && talent ? (
            <ProposalGenerator
              project={project}
              talent={talent}
              matchScore={matchScore}
              onSend={() => {
                // 提案書送信処理
                console.log("提案書を送信しました")
                setShowProposal(false)
              }}
              onSave={() => {
                // 下書き保存処理
                console.log("下書きを保存しました")
              }}
            />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* メインフォーム */}
              <div className="lg:col-span-2 space-y-6">
                {/* 案件選択 */}
                <Card>
                  <CardHeader>
                    <CardTitle>案件選択</CardTitle>
                    <CardDescription>マッチングする案件を選択してください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="案件名、会社名で検索..."
                        className="pl-10"
                        value={searchProject}
                        onChange={(e) => setSearchProject(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {filteredProjects.map((proj) => (
                        <div
                          key={proj.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedProject === proj.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedProject(proj.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{proj.title}</h4>
                              <p className="text-sm text-muted-foreground">{proj.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">¥{proj.budget.toLocaleString()}</div>
                              <Badge variant="outline" className="text-xs">
                                {proj.status === "active" ? "募集中" : "下書き"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 人材選択 */}
                <Card>
                  <CardHeader>
                    <CardTitle>人材選択</CardTitle>
                    <CardDescription>マッチングする人材を選択してください</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="人材名、職種で検索..."
                        className="pl-10"
                        value={searchTalent}
                        onChange={(e) => setSearchTalent(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {filteredTalents.map((tal) => (
                        <div
                          key={tal.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedTalent === tal.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          }`}
                          onClick={() => setSelectedTalent(tal.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=40&width=40&query=${tal.name}`}
                              />
                              <AvatarFallback>{tal.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium">{tal.name}</h4>
                              <p className="text-sm text-muted-foreground">{tal.title}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">¥{tal.hourlyRate.toLocaleString()}/時</div>
                              <Badge
                                variant={tal.availability === "available" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {tal.availability === "available" ? "対応可能" : "多忙"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* マッチング詳細 */}
                {project && talent && (
                  <Card>
                    <CardHeader>
                      <CardTitle>マッチング詳細</CardTitle>
                      <CardDescription>選択した案件と人材の詳細情報</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="notes">メモ</Label>
                        <Textarea
                          id="notes"
                          placeholder="マッチングに関するメモを入力してください..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* サイドバー */}
              <div className="space-y-6">
                {/* マッチング結果 */}
                {project && talent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        マッチング結果
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{matchScore}%</div>
                        <div className="text-sm text-muted-foreground">マッチ度</div>
                      </div>

                      <Progress value={matchScore} className="h-3" />

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            マッチするスキル
                          </h4>
                          <div className="flex flex-wrap gap-1">
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

                        {project.requiredSkills.filter((skill) => !talent.skills.includes(skill)).length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              不足スキル
                            </h4>
                            <div className="flex flex-wrap gap-1">
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
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* アクション */}
                <Card>
                  <CardHeader>
                    <CardTitle>アクション</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" disabled={!project || !talent} onClick={() => setShowProposal(true)}>
                      提案書を作成
                    </Button>
                    <Button className="w-full bg-transparent" disabled={!project || !talent} variant="outline">
                      簡易マッチングを作成
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/matching">キャンセル</Link>
                    </Button>

                    {project && talent && (
                      <div className="text-xs text-muted-foreground pt-2">
                        {project.title} × {talent.name} の提案を作成します
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
