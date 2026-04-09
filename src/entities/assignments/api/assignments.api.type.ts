export interface IAssignment {
    id: number
    class_id: number
    title: string
    description: string
    due_date: string
    created_at: string
    my_status?: "not_submitted" | "submitted" | "ai_done" | "graded"
    class?: { id: number; name: string }
}

export interface IAssignmentDetail extends IAssignment {
    stats: {
        total_students: number
        submitted_count: number
        graded_count: number
        submission_rate: number
    }
    my_submission?: IMySubmission | null
}

export interface IMySubmission {
    id: number
    assignment_id: number
    student_id: string
    text_content: string
    status: "not_submitted" | "submitted" | "ai_done" | "graded"
    submitted_at: string | null
    images: { id: number; image_url: string }[]
}
