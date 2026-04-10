export interface IClass {
    id: number
    name: string
    teacher_id: string
    invite_code: string
    created_at: string
    teacher?: {
        id: string
        name: string
        subject: string
    }
    student_count?: number
    assignment_count?: number
}

export interface IClassDetail {
    class: IClass
    teacher: {
        id: string
        name: string
        subject: string
    }
    student_count: number
    assignment_count: number
}

export interface IClassAssignment {
    id: number
    class_id: number
    title: string
    description: string
    due_date: string
    created_at: string
    my_status?: "not_submitted" | "submitted" | "ai_done" | "graded"
}
