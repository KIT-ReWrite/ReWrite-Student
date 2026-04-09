export interface ISubmission {
    id: number
    assignment_id: number
    student_id: string
    text_content: string
    status: "not_submitted" | "submitted" | "ai_done" | "graded"
    submitted_at: string | null
    images: ISubmissionImage[]
    ai_feedback?: IAIFeedback | null
    teacher_feedback?: ITeacherFeedback | null
    assignment?: {
        id: number
        title: string
        description: string
        due_date: string
        class: { id: number; name: string }
    }
}

export interface ISubmissionImage {
    id: number
    submission_id: number
    image_url: string
    created_at: string
}

export interface IAIFeedback {
    id: number
    submission_id: number
    summary: string
    detail_analysis: {
        logical: { score: number; comment: string }
        structure: { score: number; comment: string }
        grammar: { score: number; comment: string }
        creativity: { score: number; comment: string }
        understanding: { score: number; comment: string }
    }
    improvement_suggestions: string[]
    created_at: string
}

export interface ITeacherFeedback {
    id: number
    submission_id: number
    score: number
    feedback: string
    created_at: string
}
