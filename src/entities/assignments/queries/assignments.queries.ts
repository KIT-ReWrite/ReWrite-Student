import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { assignmentsApi } from "../api/assignments.api"
import type { ICreateAssignmentRequest, IUpdateAssignmentRequest } from "../api/assignments.api.type"

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

// ✅ polling 파라미터 추가
export const useAssignmentDetailQuery = (assignmentId: number, polling = false) =>
    useQuery({
        queryKey: ASSIGNMENT_KEYS.detail(assignmentId),
        queryFn: () => assignmentsApi.getAssignmentDetail(assignmentId),
        enabled: !!assignmentId,
        // polling=true면 3초마다 재요청, ai_done/graded면 자동 중단
        refetchInterval: polling ? 1500 : false,
    })

export const useCreateAssignmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (body: ICreateAssignmentRequest) => assignmentsApi.createAssignment(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all })
            toast.success("과제가 생성되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "과제 생성에 실패했습니다."),
    })
}

export const useUpdateAssignmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, body }: { id: number; body: IUpdateAssignmentRequest }) =>
            assignmentsApi.updateAssignment(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all })
            toast.success("과제가 수정되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "과제 수정에 실패했습니다."),
    })
}

export const useDeleteAssignmentMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => assignmentsApi.deleteAssignment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ASSIGNMENT_KEYS.all })
            toast.success("과제가 삭제되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "과제 삭제에 실패했습니다."),
    })
}
