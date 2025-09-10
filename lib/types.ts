// 案件管理用の型定義
export interface Project {
  id: string
  title: string
  description: string
  company: string
  budget: number
  currency: string
  duration: string
  location: string
  workStyle: "remote" | "onsite" | "hybrid"
  status: "draft" | "active" | "paused" | "completed" | "cancelled"
  requiredSkills: string[]
  preferredSkills: string[]
  experienceLevel: "junior" | "mid" | "senior" | "expert"
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
  applicantCount: number
  viewCount: number
  contactEmail: string
  contactPerson: string
  priority: "high" | "medium" | "low"
  ageRestriction?: string
  foreignNationalAllowed: boolean
  placementCompany: string
  isExternal?: boolean
  checkRequirements?: CheckRequirement[]
}

export interface CheckRequirement {
  id: string
  category: "skill" | "experience" | "certification" | "language" | "other"
  title: string
  description: string
  priority: "must" | "should" | "nice"
  criteria: string
}

export interface RequirementCheck {
  requirementId: string
  status: "pass" | "fail" | "partial" | "unknown"
  score: number
  reasoning: string
  evidence: string[]
}

export interface Talent {
  id: string
  name: string
  email: string
  phone: string
  title: string
  experience: number
  skills: string[]
  hourlyRate: number
  availability: "available" | "busy" | "unavailable"
  location: string
  workStyle: "remote" | "onsite" | "hybrid"
  bio: string
  portfolio: string
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  projectId: string
  talentId: string
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected"
  appliedAt: string
  message: string
  proposedRate: number
}

export interface Match {
  id: string
  projectId: string
  talentId: string
  status:
    | "proposed"
    | "interview_scheduled"
    | "interview_completed"
    | "negotiating"
    | "contracted"
    | "completed"
    | "cancelled"
  matchScore: number
  proposedAt: string
  updatedAt: string
  notes: string
  timeline: MatchTimelineEvent[]
}

export interface MatchTimelineEvent {
  id: string
  type:
    | "proposed"
    | "interview_scheduled"
    | "interview_completed"
    | "contract_sent"
    | "contract_signed"
    | "project_started"
    | "project_completed"
    | "note_added"
  title: string
  description: string
  createdAt: string
  createdBy: string
}

export interface MatchSuggestion {
  projectId: string
  talentId: string
  matchScore: number
  reasons: string[]
  skillMatches: string[]
  concerns: string[]
  requirementChecks?: RequirementCheck[]
}
