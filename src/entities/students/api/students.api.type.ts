export interface IStudentMetrics {
    logical: number
    structure: number
    grammar: number
    creativity: number
    understanding: number
    updated_at: string
}

export interface IStudentScoreHistory {
    id: number
    score: number
    created_at: string
    assignment: { id: number; title: string }
}
