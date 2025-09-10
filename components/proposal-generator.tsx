"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, Send, Eye } from "lucide-react"
import type { Project, Talent } from "@/lib/types"

interface ProposalGeneratorProps {
  project: Project
  talent: Talent
  matchScore: number
  onSend?: () => void
  onSave?: () => void
}

export function ProposalGenerator({ project, talent, matchScore, onSend, onSave }: ProposalGeneratorProps) {
  const [proposalData, setProposalData] = useState({
    executiveSummary: `${talent.name}様は、${project.title}プロジェクトに最適な人材です。${matchScore}%の高いマッチ度を誇り、必要なスキルセットを完全に満たしています。`,
    projectOverview: project.description,
    talentHighlights: `・${talent.experience}年の豊富な経験\n・${talent.skills.slice(0, 3).join("、")}などの専門スキル\n・${talent.workStyle}での勤務が可能`,
    proposedSchedule: `開始予定日: ${project.startDate}\n期間: ${project.duration}\n勤務形態: ${project.workStyle}`,
    budgetProposal: `時間単価: ¥${talent.hourlyRate.toLocaleString()}/時\n想定工数: 月160時間\n月額概算: ¥${(talent.hourlyRate * 160).toLocaleString()}`,
    nextSteps: "1. 提案書のご確認\n2. 面談日程の調整\n3. 条件詳細の協議\n4. 契約締結",
    customMessage: "",
  })

  const skillMatches = project.requiredSkills.filter((skill) => talent.skills.includes(skill))
  const missingSkills = project.requiredSkills.filter((skill) => !talent.skills.includes(skill))

  return (
    <div className="space-y-6">
      {/* 提案書ヘッダー */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            提案書作成
          </CardTitle>
          <CardDescription>
            {project.company}様への{talent.name}様のご提案書を作成します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">案件情報</h4>
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-medium">案件名:</span> {project.title}
                </div>
                <div>
                  <span className="font-medium">会社:</span> {project.company}
                </div>
                <div>
                  <span className="font-medium">予算:</span> ¥{project.budget.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">提案人材</h4>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${talent.name}`} />
                  <AvatarFallback>{talent.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{talent.name}</div>
                  <div className="text-xs text-muted-foreground">{talent.title}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <span className="font-medium">マッチ度</span>
            <div className="flex items-center gap-2">
              <Progress value={matchScore} className="w-20 h-2" />
              <span className="font-bold text-primary">{matchScore}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 提案書内容編集 */}
      <Card>
        <CardHeader>
          <CardTitle>提案書内容</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="executive-summary">エグゼクティブサマリー</Label>
            <Textarea
              id="executive-summary"
              value={proposalData.executiveSummary}
              onChange={(e) => setProposalData((prev) => ({ ...prev, executiveSummary: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="talent-highlights">人材の強み・特徴</Label>
            <Textarea
              id="talent-highlights"
              value={proposalData.talentHighlights}
              onChange={(e) => setProposalData((prev) => ({ ...prev, talentHighlights: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="schedule">提案スケジュール</Label>
              <Textarea
                id="schedule"
                value={proposalData.proposedSchedule}
                onChange={(e) => setProposalData((prev) => ({ ...prev, proposedSchedule: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">予算提案</Label>
              <Textarea
                id="budget"
                value={proposalData.budgetProposal}
                onChange={(e) => setProposalData((prev) => ({ ...prev, budgetProposal: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-steps">今後の進め方</Label>
            <Textarea
              id="next-steps"
              value={proposalData.nextSteps}
              onChange={(e) => setProposalData((prev) => ({ ...prev, nextSteps: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-message">追加メッセージ</Label>
            <Textarea
              id="custom-message"
              placeholder="案件固有の情報や特別な配慮事項があれば記載してください..."
              value={proposalData.customMessage}
              onChange={(e) => setProposalData((prev) => ({ ...prev, customMessage: e.target.value }))}
              className="min-h-[60px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* スキルマッチング詳細 */}
      <Card>
        <CardHeader>
          <CardTitle>スキルマッチング詳細</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-2 text-green-600">✓ マッチするスキル ({skillMatches.length}個)</h4>
              <div className="flex flex-wrap gap-1">
                {skillMatches.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-green-200 text-green-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {missingSkills.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-2 text-orange-600">△ 要検討スキル ({missingSkills.length}個)</h4>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-orange-200 text-orange-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ※ これらのスキルについては、学習意欲や関連経験でカバー可能かご相談ください
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* アクションボタン */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Button className="flex-1 gap-2" onClick={onSend}>
              <Send className="h-4 w-4" />
              提案書を送信
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={onSave}>
              <FileText className="h-4 w-4" />
              下書き保存
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              プレビュー
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              PDF出力
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
