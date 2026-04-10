import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { ISubmission } from "./submissions.api.type"

export const submissionsApi = {
    /** 제출물 상세 */
    getSubmissionDetail: async (submissionId: number) =>
        ApiHelper.get<ISubmission>(API_PATH.SUBMISSIONS.DETAIL(submissionId)),

    /** 과제 제출 */
    submitAssignment: async (assignmentId: number, text_content: string, images?: File[]) => {
        const formData = new FormData()
        formData.append("text_content", text_content)
        images?.forEach((file) => formData.append("images", file))
        return ApiHelper.postForm<ISubmission>(API_PATH.SUBMISSIONS.SUBMIT(assignmentId), formData)
    },

    /** 제출 수정 */
    updateSubmission: async (submissionId: number, text_content: string, images?: File[]) => {
        const formData = new FormData()
        formData.append("text_content", text_content)
        images?.forEach((file) => formData.append("images", file))
        return ApiHelper.patchForm<ISubmission>(API_PATH.SUBMISSIONS.UPDATE(submissionId), formData)
    },

    deleteSubmissionImage: async (imageId: number) =>
        ApiHelper.delete<{ message: string }>(API_PATH.SUBMISSIONS.DELETE_IMAGE(imageId)),

    /** AI 피드백 조회 */
    getAIFeedback: async (submissionId: number) =>
        ApiHelper.get<ISubmission["ai_feedback"]>(API_PATH.SUBMISSIONS.AI_FEEDBACK(submissionId)),

    /** 교사 피드백 조회 */
    getTeacherFeedback: async (submissionId: number) =>
        ApiHelper.get<ISubmission["teacher_feedback"]>(API_PATH.SUBMISSIONS.TEACHER_FEEDBACK(submissionId)),
}
