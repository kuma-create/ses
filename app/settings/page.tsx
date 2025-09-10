"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  Key,
  CreditCard,
  Users,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Save,
} from "lucide-react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    matching: true,
    proposals: true,
    system: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 lg:ml-72">
      <div className="container mx-auto p-6 pt-16 lg:pt-6 max-w-6xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">設定</h1>
          <p className="text-muted-foreground">アカウントとシステムの設定を管理します</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1">
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">プロフィール</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 py-3">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">通知</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-3">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">セキュリティ</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2 py-3">
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">API</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 py-3">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">請求</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">チーム</span>
            </TabsTrigger>
          </TabsList>

          {/* プロフィール設定 */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  プロフィール情報
                </CardTitle>
                <CardDescription>あなたの基本情報とプロフィール画像を管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/user-avatar.jpg" alt="プロフィール画像" />
                    <AvatarFallback className="text-lg">管理</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      画像を変更
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG、PNG形式、最大2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">姓</Label>
                    <Input id="firstName" defaultValue="田中" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">名</Label>
                    <Input id="lastName" defaultValue="太郎" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input id="email" type="email" defaultValue="admin@talentmatch.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号</Label>
                    <Input id="phone" defaultValue="090-1234-5678" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">会社名</Label>
                  <Input id="company" defaultValue="株式会社TalentMatch" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea
                    id="bio"
                    placeholder="あなたの経歴や専門分野について教えてください"
                    className="min-h-[100px]"
                    defaultValue="人材マッチング業界で10年以上の経験を持つ。効率的なマッチングシステムの構築と運用に専門性を持つ。"
                  />
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  変更を保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知設定 */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  通知設定
                </CardTitle>
                <CardDescription>受信したい通知の種類を選択してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label>メール通知</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">重要な更新をメールで受信</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <Label>プッシュ通知</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">ブラウザでのリアルタイム通知</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>新しいマッチング</Label>
                      <p className="text-sm text-muted-foreground">新しいマッチング候補が見つかった時</p>
                    </div>
                    <Switch
                      checked={notifications.matching}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, matching: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>提案の更新</Label>
                      <p className="text-sm text-muted-foreground">提案のステータスが変更された時</p>
                    </div>
                    <Switch
                      checked={notifications.proposals}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, proposals: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>システム通知</Label>
                      <p className="text-sm text-muted-foreground">メンテナンスやシステム更新の通知</p>
                    </div>
                    <Switch
                      checked={notifications.system}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, system: checked }))}
                    />
                  </div>
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  通知設定を保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* セキュリティ設定 */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  セキュリティ設定
                </CardTitle>
                <CardDescription>アカウントのセキュリティを強化します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">現在のパスワード</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="現在のパスワードを入力"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">新しいパスワード</Label>
                    <Input id="newPassword" type="password" placeholder="新しいパスワードを入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">パスワード確認</Label>
                    <Input id="confirmPassword" type="password" placeholder="新しいパスワードを再入力" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <Label>二要素認証</Label>
                        <Badge variant="outline" className="text-xs">
                          推奨
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">アカウントのセキュリティを強化</p>
                    </div>
                    <Button variant="outline">設定</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>ログイン履歴</Label>
                      <p className="text-sm text-muted-foreground">最近のログイン活動を確認</p>
                    </div>
                    <Button variant="outline">表示</Button>
                  </div>
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  パスワードを変更
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API設定 */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API設定
                </CardTitle>
                <CardDescription>外部システムとの連携用APIキーを管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">プロダクションAPIキー</Label>
                      <Badge>アクティブ</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input value="tm_prod_••••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                      <Button variant="outline" size="sm">
                        コピー
                      </Button>
                      <Button variant="outline" size="sm">
                        再生成
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">最終使用: 2024年1月15日 14:30</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">テスト用APIキー</Label>
                      <Badge variant="secondary">テスト</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input value="tm_test_••••••••••••••••••••••••••••••••" readOnly className="font-mono text-sm" />
                      <Button variant="outline" size="sm">
                        コピー
                      </Button>
                      <Button variant="outline" size="sm">
                        再生成
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">最終使用: 2024年1月10日 09:15</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-medium">Webhook設定</Label>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-domain.com/webhook"
                      defaultValue="https://api.example.com/talentmatch/webhook"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookSecret">Webhook Secret</Label>
                    <Input id="webhookSecret" type="password" placeholder="Webhook署名用のシークレット" />
                  </div>
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  API設定を保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 請求設定 */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  請求・支払い設定
                </CardTitle>
                <CardDescription>プランと支払い方法を管理します</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">プロフェッショナルプラン</h3>
                      <p className="text-muted-foreground">月額 ¥29,800</p>
                    </div>
                    <Badge className="bg-primary">現在のプラン</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>✓ 無制限の案件投稿</div>
                    <div>✓ 高度なマッチング機能</div>
                    <div>✓ API アクセス</div>
                    <div>✓ 優先サポート</div>
                  </div>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    プランを変更
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">支払い方法</Label>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">有効期限: 12/26</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        変更
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">請求履歴</Label>
                  <div className="space-y-2">
                    {[
                      { date: "2024年1月1日", amount: "¥29,800", status: "支払い済み" },
                      { date: "2023年12月1日", amount: "¥29,800", status: "支払い済み" },
                      { date: "2023年11月1日", amount: "¥29,800", status: "支払い済み" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {invoice.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            ダウンロード
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* チーム管理 */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  チーム管理
                </CardTitle>
                <CardDescription>チームメンバーの招待と権限管理</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Input placeholder="メールアドレスを入力" className="flex-1" />
                  <Select defaultValue="member">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">管理者</SelectItem>
                      <SelectItem value="member">メンバー</SelectItem>
                      <SelectItem value="viewer">閲覧者</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>招待</Button>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">チームメンバー</Label>
                  <div className="space-y-3">
                    {[
                      { name: "田中太郎", email: "admin@talentmatch.com", role: "管理者", avatar: "/user-avatar.jpg" },
                      { name: "佐藤花子", email: "sato@talentmatch.com", role: "メンバー", avatar: null },
                      { name: "鈴木一郎", email: "suzuki@talentmatch.com", role: "閲覧者", avatar: null },
                    ].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.role === "管理者" ? "default" : "secondary"}>{member.role}</Badge>
                          {member.role !== "管理者" && (
                            <Button variant="ghost" size="sm" className="text-destructive">
                              削除
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
