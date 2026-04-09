import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IStudentMetrics, IStudentScoreHistory } from "./students.api.type"

export const studentsApi = {
    getMetrics: async (studentId: string) => ApiHelper.get<IStudentMetrics>(API_PATH.STUDENTS.METRICS(studentId)),

    getScores: async (studentId: string) => ApiHelper.get<IStudentScoreHistory[]>(API_PATH.STUDENTS.SCORES(studentId)),
}
