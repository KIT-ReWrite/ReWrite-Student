import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { submissionsApi } from "../api/submissions.api"

export const SUBMISSION_KEYS = {
    detail: (id: number) => ["submissions", id] as const,
}

export const useSubmissionDetailQuery = (submissionId: number) =>
    useQuery({
        queryKey: SUBMISSION_KEYS.detail(submissionId),
        queryFn: () => submissionsApi.getSubmissionDetail(submissionId),
        enabled: !!submissionId,
    })

export const useSubmitAssignmentMutation = (assignmentId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ text_content, images }: { text_content: string; images?: File[] }) =>
            submissionsApi.submitAssignment(assignmentId, text_content, images),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] })
            toast.success("과제가 제출되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "제출에 실패했습니다."),
    })
}

export const useUpdateSubmissionMutation = (submissionId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ text_content, images }: { text_content: string; images?: File[] }) =>
            submissionsApi.updateSubmission(submissionId, text_content, images),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.detail(submissionId) })
            queryClient.invalidateQueries({ queryKey: ["assignments"] })
            toast.success("제출물이 수정되었습니다.")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "수정에 실패했습니다."),
    })
}

// ✅ 이미지 삭제 추가
export const useDeleteSubmissionImageMutation = (submissionId: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (imageId: number) => submissionsApi.deleteSubmissionImage(imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: SUBMISSION_KEYS.detail(submissionId) })
            queryClient.invalidateQueries({ queryKey: ["assignments"] })
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "이미지 삭제에 실패했습니다."),
    })
}
