import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockTalents, mockExternalTalents } from "@/lib/mock-data"
import { Search, Filter, Plus, Eye, Send, ExternalLink } from "lucide-react"
import Link from "next/link"

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

export default function TalentsPage() {
  const internalTalents = mockTalents
  const externalTalents = mockExternalTalents
  const allTalents = [...internalTalents, ...externalTalents]

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-0">
      <Header />

      <main className="lg:ml-72 p-4 lg:p-6 space-y-6">
        {/* ページヘッダー */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">人材を探す</h1>
            <p className="text-foreground/70">
              1-{Math.min(20, allTalents.length)}件表示中 / 全{allTalents.length}件
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-black" asChild>
              <Link href="/projects">
                <Eye className="h-4 w-4" />
                案件を検索
              </Link>
            </Button>
            <Button className="gap-2" asChild>
              <Link href="/talents/new">
                <Plus className="h-4 w-4" />
                新規人材登録
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
                <Input placeholder="名前、スキル、職種で検索..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="稼働状況" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="available">対応可能</SelectItem>
                    <SelectItem value="busy">多忙</SelectItem>
                    <SelectItem value="unavailable">対応不可</SelectItem>
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

        {/* 人材一覧テーブル */}
        <Tabs defaultValue="external" className="space-y-4">
          <TabsList>
            <TabsTrigger value="external">他社人材 ({externalTalents.length})</TabsTrigger>
            <TabsTrigger value="internal">自社人材 ({internalTalents.length})</TabsTrigger>
            <TabsTrigger value="all">すべて ({allTalents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="external" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>人材名</TableHead>
                    <TableHead>会社</TableHead>
                    <TableHead>単価（万円）</TableHead>
                    <TableHead>期間</TableHead>
                    <TableHead>スキル</TableHead>
                    <TableHead>年齢制限</TableHead>
                    <TableHead>リモート</TableHead>
                    <TableHead>開始時期</TableHead>
                    <TableHead>置人事業主</TableHead>
                    <TableHead>外国籍</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {externalTalents.map((talent) => (
                    <TableRow key={talent.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-primary hover:underline cursor-pointer">{talent.name}</div>
                          <div className="text-sm text-muted-foreground">{talent.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(talent.createdAt).toLocaleDateString("ja-JP")}{" "}
                            {new Date(talent.createdAt).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.company || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {talent.hourlyRate ? `¥${Math.round((talent.hourlyRate * 160) / 10000)}万円` : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.experience}年経験</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {talent.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {talent.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{talent.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">-</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{workStyleLabels[talent.workStyle]}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={availabilityColors[talent.availability]} className="text-xs">
                          {availabilityLabels[talent.availability]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.placementCompany || "-"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.foreignNational ? "可" : "不可"}</div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90 text-white" asChild>
                          <Link href={`/proposals/new?talentId=${talent.id}`}>
                            <Send className="h-3 w-3" />
                            提案する
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="internal" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>人材名</TableHead>
                    <TableHead>会社</TableHead>
                    <TableHead>単価（万円）</TableHead>
                    <TableHead>期間</TableHead>
                    <TableHead>スキル</TableHead>
                    <TableHead>年齢制限</TableHead>
                    <TableHead>リモート</TableHead>
                    <TableHead>開始時期</TableHead>
                    <TableHead>置人事業主</TableHead>
                    <TableHead>外国籍</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internalTalents.map((talent) => (
                    <TableRow key={talent.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-primary hover:underline cursor-pointer">{talent.name}</div>
                          <div className="text-sm text-muted-foreground">{talent.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(talent.createdAt).toLocaleDateString("ja-JP")}{" "}
                            {new Date(talent.createdAt).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">自社</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">¥{Math.round((talent.hourlyRate * 160) / 10000)}万円</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.experience}年経験</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {talent.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {talent.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{talent.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">-</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{workStyleLabels[talent.workStyle]}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={availabilityColors[talent.availability]} className="text-xs">
                          {availabilityLabels[talent.availability]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">自社</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">-</div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent" asChild>
                          <Link href={`/talents/${talent.id}`}>
                            <ExternalLink className="h-3 w-3" />
                            詳細
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>人材名</TableHead>
                    <TableHead>会社</TableHead>
                    <TableHead>単価（万円）</TableHead>
                    <TableHead>期間</TableHead>
                    <TableHead>スキル</TableHead>
                    <TableHead>年齢制限</TableHead>
                    <TableHead>リモート</TableHead>
                    <TableHead>開始時期</TableHead>
                    <TableHead>置人事業主</TableHead>
                    <TableHead>外国籍</TableHead>
                    <TableHead>アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allTalents.map((talent) => (
                    <TableRow key={talent.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-primary hover:underline cursor-pointer">{talent.name}</div>
                          <div className="text-sm text-muted-foreground">{talent.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(talent.createdAt).toLocaleDateString("ja-JP")}{" "}
                            {new Date(talent.createdAt).toLocaleTimeString("ja-JP", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.company || (talent.isExternal ? "-" : "自社")}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">¥{Math.round((talent.hourlyRate * 160) / 10000)}万円</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.experience}年経験</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {talent.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {talent.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{talent.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">-</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{workStyleLabels[talent.workStyle]}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={availabilityColors[talent.availability]} className="text-xs">
                          {availabilityLabels[talent.availability]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{talent.placementCompany || "自社"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {talent.foreignNational !== undefined ? (talent.foreignNational ? "可" : "不可") : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {talent.isExternal ? (
                          <Button size="sm" className="gap-1 bg-primary hover:bg-primary/90 text-white" asChild>
                            <Link href={`/proposals/new?talentId=${talent.id}`}>
                              <Send className="h-3 w-3" />
                              提案する
                            </Link>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="gap-1 bg-transparent" asChild>
                            <Link href={`/talents/${talent.id}`}>
                              <ExternalLink className="h-3 w-3" />
                              詳細
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ページネーション */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            前へ
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            次へ
          </Button>
        </div>
      </main>
    </div>
  )
}
