import { useQuery } from "@tanstack/react-query"
import { assignmentsApi } from "../api/assignments.api"

export const ASSIGNMENT_KEYS = {
    all: ["assignments"] as const,
    filtered: (status?: string) => ["assignments", status] as const,
    detail: (id: number) => ["assignments", id] as const,
}

export const useAssignmentsQuery = (status?: string) =>
    useQuery({
        queryKey: ASSIGNMENT_KEYS.filtered(status),
        queryFn: () => assignmentsApi.getAssignments(status),
    })

export const useAssignmentDetailQuery = (assignmentId: number) =>
    useQuery({
        queryKey: ASSIGNMENT_KEYS.detail(assignmentId),
        queryFn: () => assignmentsApi.getAssignmentDetail(assignmentId),
        enabled: !!assignmentId,
    })
