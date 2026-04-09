import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IAssignment, IAssignmentDetail } from "./assignments.api.type"

export const assignmentsApi = {
    /** 전체 과제 목록 (status 필터) */
    getAssignments: async (status?: string) =>
        ApiHelper.get<IAssignment[]>(API_PATH.ASSIGNMENTS.LIST, {
            params: status && status !== "all" ? { status } : undefined,
        }),

    /** 과제 상세 */
    getAssignmentDetail: async (assignmentId: number) =>
        ApiHelper.get<IAssignmentDetail>(API_PATH.ASSIGNMENTS.DETAIL(assignmentId)),
}
