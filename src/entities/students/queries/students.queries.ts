import { useQuery } from "@tanstack/react-query"
import { studentsApi } from "../api/students.api"

export const STUDENT_KEYS = {
    metrics: (id: string) => ["students", id, "metrics"] as const,
    scores: (id: string) => ["students", id, "scores"] as const,
}

export const useStudentMetricsQuery = (studentId: string) =>
    useQuery({
        queryKey: STUDENT_KEYS.metrics(studentId),
        queryFn: () => studentsApi.getMetrics(studentId),
        enabled: !!studentId,
    })

export const useStudentScoresQuery = (studentId: string) =>
    useQuery({
        queryKey: STUDENT_KEYS.scores(studentId),
        queryFn: () => studentsApi.getScores(studentId),
        enabled: !!studentId,
    })
