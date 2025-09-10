"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, X, CheckCircle, AlertCircle, Star } from "lucide-react"
import Link from "next/link"
import type { CheckRequirement } from "@/lib/types"

export default function NewProjectPage() {
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const [preferredSkills, setPreferredSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [checkRequirements, setCheckRequirements] = useState<CheckRequirement[]>([])
  const [newRequirement, setNewRequirement] = useState({
    category: "skill" as const,
    title: "",
    description: "",
    priority: "must" as const,
    criteria: "",
  })

  const addSkill = (skillList: string[], setSkillList: (skills: string[]) => void) => {
    if (newSkill.trim() && !skillList.includes(newSkill.trim())) {
      setSkillList([...skillList, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string, skillList: string[], setSkillList: (skills: string[]) => void) => {
    setSkillList(skillList.filter((s) => s !== skill))
  }

  const addCheckRequirement = () => {
    if (newRequirement.title.trim() && newRequirement.criteria.trim()) {
      const requirement: CheckRequirement = {
        id: Date.now().toString(),
        ...newRequirement,
      }
      setCheckRequirements([...checkRequirements, requirement])
      setNewRequirement({
        category: "skill",
        title: "",
        description: "",
        priority: "must",
        criteria: "",
      })
    }
  }

  const removeCheckRequirement = (id: string) => {
    setCheckRequirements(checkRequirements.filter((req) => req.id !== id))
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "must":
        return <CheckCircle className="h-4 w-4 text-red-500" />
      case "should":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "nice":
        return <Star className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "must":
        return "必須"
      case "should":
        return "重要"
      case "nice":
        return "歓迎"
      default:
        return priority
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="lg:pl-72">
        <div className="p-6 space-y-6">
          {/* ページヘッダー */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">新規案件作成</h1>
              <p className="text-muted-foreground">新しい案件を作成します</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* メインフォーム */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                  <CardDescription>案件の基本的な情報を入力してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">案件名 *</Label>
                    <Input id="title" placeholder="例: Reactフロントエンド開発" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">会社名 *</Label>
                    <Input id="company" placeholder="例: 株式会社テックイノベーション" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">案件詳細 *</Label>
                    <Textarea
                      id="description"
                      placeholder="案件の詳細な説明を入力してください..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="budget">予算 *</Label>
                      <Input id="budget" type="number" placeholder="800000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">期間 *</Label>
                      <Input id="duration" placeholder="例: 3ヶ月" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 勤務条件 */}
              <Card>
                <CardHeader>
                  <CardTitle>勤務条件</CardTitle>
                  <CardDescription>勤務に関する条件を設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="workStyle">勤務形態 *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="勤務形態を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">リモート</SelectItem>
                          <SelectItem value="onsite">オンサイト</SelectItem>
                          <SelectItem value="hybrid">ハイブリッド</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">経験レベル *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="経験レベルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="junior">ジュニア（1-2年）</SelectItem>
                          <SelectItem value="mid">ミドル（3-5年）</SelectItem>
                          <SelectItem value="senior">シニア（5-8年）</SelectItem>
                          <SelectItem value="expert">エキスパート（8年以上）</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">勤務地</Label>
                    <Input id="location" placeholder="例: 東京都渋谷区" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">開始予定日</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">終了予定日</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* スキル要件 */}
              <Card>
                <CardHeader>
                  <CardTitle>スキル要件</CardTitle>
                  <CardDescription>必要なスキルと歓迎するスキルを設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 必須スキル */}
                  <div className="space-y-3">
                    <Label>必須スキル</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="スキルを入力してEnterキー"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill(requiredSkills, setRequiredSkills)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addSkill(requiredSkills, setRequiredSkills)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {requiredSkills.map((skill) => (
                        <Badge key={skill} variant="default" className="gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, requiredSkills, setRequiredSkills)}
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* 歓迎スキル */}
                  <div className="space-y-3">
                    <Label>歓迎スキル</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="スキルを入力してEnterキー"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill(preferredSkills, setPreferredSkills)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addSkill(preferredSkills, setPreferredSkills)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {preferredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, preferredSkills, setPreferredSkills)}
                            className="ml-1 hover:bg-muted rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI自動チェック要件 */}
              <Card>
                <CardHeader>
                  <CardTitle>AI自動チェック要件</CardTitle>
                  <CardDescription>
                    提案時にAIが自動でチェックする要件を設定してください。人材のスキルや経験と照合されます。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 新しい要件追加フォーム */}
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>カテゴリ</Label>
                        <Select
                          value={newRequirement.category}
                          onValueChange={(value: any) => setNewRequirement({ ...newRequirement, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skill">スキル</SelectItem>
                            <SelectItem value="experience">経験</SelectItem>
                            <SelectItem value="certification">資格</SelectItem>
                            <SelectItem value="language">言語</SelectItem>
                            <SelectItem value="other">その他</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>優先度</Label>
                        <Select
                          value={newRequirement.priority}
                          onValueChange={(value: any) => setNewRequirement({ ...newRequirement, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="must">必須</SelectItem>
                            <SelectItem value="should">重要</SelectItem>
                            <SelectItem value="nice">歓迎</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>要件タイトル</Label>
                      <Input
                        placeholder="例: React開発経験3年以上"
                        value={newRequirement.title}
                        onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>詳細説明</Label>
                      <Textarea
                        placeholder="要件の詳細な説明を入力してください"
                        value={newRequirement.description}
                        onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>判定基準</Label>
                      <Textarea
                        placeholder="AIが判定する際の具体的な基準を入力してください（例: プロフィールにReactの実務経験が3年以上記載されている）"
                        value={newRequirement.criteria}
                        onChange={(e) => setNewRequirement({ ...newRequirement, criteria: e.target.value })}
                        className="min-h-[80px]"
                      />
                    </div>

                    <Button
                      onClick={addCheckRequirement}
                      disabled={!newRequirement.title.trim() || !newRequirement.criteria.trim()}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      チェック要件を追加
                    </Button>
                  </div>

                  {/* 追加された要件一覧 */}
                  {checkRequirements.length > 0 && (
                    <div className="space-y-3">
                      <Label>設定済みチェック要件</Label>
                      <div className="space-y-3">
                        {checkRequirements.map((req) => (
                          <div key={req.id} className="p-4 border rounded-lg bg-background">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  {getPriorityIcon(req.priority)}
                                  <span className="font-medium">{req.title}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {req.category}
                                  </Badge>
                                  <Badge
                                    variant={
                                      req.priority === "must"
                                        ? "destructive"
                                        : req.priority === "should"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {getPriorityLabel(req.priority)}
                                  </Badge>
                                </div>
                                {req.description && <p className="text-sm text-muted-foreground">{req.description}</p>}
                                <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                                  <strong>判定基準:</strong> {req.criteria}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCheckRequirement(req.id)}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 連絡先情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>連絡先情報</CardTitle>
                  <CardDescription>応募者からの連絡先を設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">担当者名 *</Label>
                    <Input id="contactPerson" placeholder="例: 田中 太郎" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">連絡先メールアドレス *</Label>
                    <Input id="contactEmail" type="email" placeholder="例: hr@company.com" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>公開設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="active">募集中</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button className="w-full">案件を作成</Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/projects">キャンセル</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>プレビュー</CardTitle>
                  <CardDescription>作成中の案件がどのように表示されるかを確認できます</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    案件情報を入力すると、ここにプレビューが表示されます。
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
