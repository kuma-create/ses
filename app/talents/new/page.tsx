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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"
import Link from "next/link"

export default function NewTalentPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">新規人材登録</h1>
              <p className="text-muted-foreground">新しい人材を登録します</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* メインフォーム */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>基本情報</CardTitle>
                  <CardDescription>人材の基本的な情報を入力してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Label>プロフィール画像</Label>
                      <Button variant="outline" size="sm">
                        画像をアップロード
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">氏名 *</Label>
                      <Input id="name" placeholder="例: 田中 太郎" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">職種 *</Label>
                      <Input id="title" placeholder="例: フロントエンドエンジニア" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス *</Label>
                      <Input id="email" type="email" placeholder="example@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">電話番号</Label>
                      <Input id="phone" placeholder="090-1234-5678" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">自己紹介 *</Label>
                    <Textarea
                      id="bio"
                      placeholder="経験、得意分野、アピールポイントなどを入力してください..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">ポートフォリオURL</Label>
                    <Input id="portfolio" placeholder="https://your-portfolio.com" />
                  </div>
                </CardContent>
              </Card>

              {/* 経験・スキル */}
              <Card>
                <CardHeader>
                  <CardTitle>経験・スキル</CardTitle>
                  <CardDescription>経験年数とスキルを設定してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="experience">経験年数 *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="経験年数を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1年</SelectItem>
                          <SelectItem value="2">2年</SelectItem>
                          <SelectItem value="3">3年</SelectItem>
                          <SelectItem value="4">4年</SelectItem>
                          <SelectItem value="5">5年</SelectItem>
                          <SelectItem value="6">6年</SelectItem>
                          <SelectItem value="7">7年</SelectItem>
                          <SelectItem value="8">8年</SelectItem>
                          <SelectItem value="9">9年</SelectItem>
                          <SelectItem value="10+">10年以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">時間単価 *</Label>
                      <Input id="hourlyRate" type="number" placeholder="8000" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>保有スキル</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="スキルを入力してEnterキー"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="default" className="gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
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
                      <Label htmlFor="availability">稼働状況 *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="稼働状況を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">対応可能</SelectItem>
                          <SelectItem value="busy">多忙</SelectItem>
                          <SelectItem value="unavailable">対応不可</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">勤務地</Label>
                    <Input id="location" placeholder="例: 東京都" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>登録設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Button className="w-full">人材を登録</Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/talents">キャンセル</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>プレビュー</CardTitle>
                  <CardDescription>登録中の人材がどのように表示されるかを確認できます</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    人材情報を入力すると、ここにプレビューが表示されます。
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
