import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type {
    IAssignment,
    IAssignmentDetail,
    ICreateAssignmentRequest,
    IUpdateAssignmentRequest,
} from "./assignments.api.type"

export const assignmentsApi = {
    /** 전체 과제 목록 (status 필터) */
    getAssignments: async (status?: string) =>
        ApiHelper.get<IAssignment[]>(API_PATH.ASSIGNMENTS.LIST, {
            params: status && status !== "all" ? { status } : undefined,
        }),

    /** 과제 상세 */
    getAssignmentDetail: async (assignmentId: number) =>
        ApiHelper.get<IAssignmentDetail>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId)),

    /** 과제 생성 */
    createAssignment: async (body: ICreateAssignmentRequest) =>
        ApiHelper.post<IAssignment>(API_PATH.ASSIGNMENTS.LIST, body),

    /** 과제 수정 */
    updateAssignment: async (assignmentId: number, body: IUpdateAssignmentRequest) =>
        ApiHelper.patch<IAssignment>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId), body),

    /** 과제 삭제 */
    deleteAssignment: async (assignmentId: number) =>
        ApiHelper.delete<{ message: string }>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId)),
}
