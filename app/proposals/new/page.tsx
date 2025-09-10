"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { mockProjects, mockExternalProjects, mockTalents, mockExternalTalents } from "@/lib/mock-data"
import { ArrowLeft, Send, FileText, User, Briefcase, Calendar, DollarSign, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function NewProposalPage() {
  const searchParams = useSearchParams()
  const talentId = searchParams.get("talentId")
  const projectId = searchParams.get("projectId")

  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedTalent, setSelectedTalent] = useState<string>(talentId || "")
  const [proposalTitle, setProposalTitle] = useState("")
  const [proposalMessage, setProposalMessage] = useState("")
  const [expectedStartDate, setExpectedStartDate] = useState("")
  const [proposedRate, setProposedRate] = useState("")

  const allProjects = [...mockProjects, ...mockExternalProjects]
  const allTalents = [...mockTalents, ...mockExternalTalents]

  const talent = allTalents.find((t) => t.id === selectedTalent)
  const project = allProjects.find((p) => p.id === selectedProject)

  useEffect(() => {
    if (projectId) {
      setSelectedProject(projectId)
    }
  }, [projectId])

  useEffect(() => {
    if (talent && project) {
      setProposalTitle(`${project.title} - ${talent.name}様への提案`)
      setProposalMessage(`${talent.name}様

いつもお世話になっております。
この度、以下の案件についてご提案させていただきたく、ご連絡いたします。

【案件概要】
${project.title}

【業務内容】
${project.description}

【必要スキル】
${project.requiredSkills.join(", ")}

${talent.name}様のご経験とスキルが本案件に非常にマッチしており、ぜひご検討いただければと思います。

ご質問やご不明な点がございましたら、お気軽にお声がけください。
何卒よろしくお願いいたします。`)
    }
  }, [talent, project])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 提案送信処理
    alert("提案を送信しました！")
  }

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-0">
      <Header />

      <main className="lg:pl-72 p-4 lg:p-6 space-y-6">
        {/* ページヘッダー */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/talents">
              <ArrowLeft className="h-4 w-4" />
              戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">新規提案作成</h1>
            <p className="text-muted-foreground">案件と人材をマッチングして提案を作成します</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 提案フォーム */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  提案内容
                </CardTitle>
                <CardDescription>案件と人材を選択して提案内容を作成してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="project">案件選択</Label>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="案件を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {allProjects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.title} - {project.company}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="talent">人材選択</Label>
                      <Select value={selectedTalent} onValueChange={setSelectedTalent}>
                        <SelectTrigger>
                          <SelectValue placeholder="人材を選択してください" />
                        </SelectTrigger>
                        <SelectContent>
                          {allTalents.map((talent) => (
                            <SelectItem key={talent.id} value={talent.id}>
                              {talent.name} - {talent.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">提案タイトル</Label>
                    <Input
                      id="title"
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      placeholder="提案のタイトルを入力してください"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">開始予定日</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={expectedStartDate}
                        onChange={(e) => setExpectedStartDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rate">提案単価（円/時）</Label>
                      <Input
                        id="rate"
                        type="number"
                        value={proposedRate}
                        onChange={(e) => setProposedRate(e.target.value)}
                        placeholder="時間単価を入力"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">提案メッセージ</Label>
                    <Textarea
                      id="message"
                      value={proposalMessage}
                      onChange={(e) => setProposalMessage(e.target.value)}
                      placeholder="提案内容を詳しく記載してください"
                      rows={12}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="gap-2">
                      <Send className="h-4 w-4" />
                      提案を送信
                    </Button>
                    <Button type="button" variant="outline">
                      下書き保存
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー - 選択された案件・人材情報 */}
          <div className="space-y-6">
            {/* 選択された人材情報 */}
            {talent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    選択された人材
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{talent.name}</h3>
                    <p className="text-sm text-muted-foreground">{talent.title}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4" />¥{talent.hourlyRate.toLocaleString()}/時
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {talent.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {talent.experience}年経験
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">スキル</p>
                    <div className="flex flex-wrap gap-1">
                      {talent.skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {talent.skills.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{talent.skills.length - 6}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 選択された案件情報 */}
            {project && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    選択された案件
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4" />
                      {project.budget ? `¥${project.budget.toLocaleString()}` : "応相談"}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {project.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">必要スキル</p>
                    <div className="flex flex-wrap gap-1">
                      {project.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium mb-1">案件詳細</p>
                    <p className="text-xs text-muted-foreground line-clamp-4">{project.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* マッチング度 */}
            {talent && project && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">マッチング度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">総合マッチ度</span>
                      <span className="text-lg font-bold text-green-600">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>✓ スキルマッチ: 85%</div>
                      <div>✓ 経験レベル: 90%</div>
                      <div>✓ 勤務形態: 100%</div>
                      <div>⚠ 単価レンジ: 75%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
