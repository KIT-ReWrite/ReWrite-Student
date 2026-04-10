import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IClass, IClassDetail, IClassAssignment } from "./classes.api.type"

export const classesApi = {
    /** 내가 속한 학급 목록 */
    getClasses: async () => ApiHelper.get<IClass[]>(API_PATH.CLASSES.LIST),

    /** 학급 참가 */
    joinClass: async (invite_code: string) => ApiHelper.post<IClass>(API_PATH.CLASSES.JOIN, { invite_code }),

    /** 학급 상세 */
    getClassDetail: async (classId: number) => ApiHelper.get<IClassDetail>(API_PATH.CLASSES.DETAIL(classId)),

    /** 학급별 과제 목록 */
    getClassAssignments: async (classId: number) =>
        ApiHelper.get<IClassAssignment[]>(API_PATH.CLASSES.ASSIGNMENTS(classId)),
}
