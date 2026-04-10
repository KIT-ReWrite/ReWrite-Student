import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { classesApi } from "../api/classes.api"

export const CLASSES_KEYS = {
    all: ["classes"] as const,
    detail: (id: number) => ["classes", id] as const,
    assignments: (id: number) => ["classes", id, "assignments"] as const,
}

/** 학급 목록 */
export const useClassesQuery = () =>
    useQuery({
        queryKey: CLASSES_KEYS.all,
        queryFn: () => classesApi.getClasses(),
    })

/** 학급 상세 */
export const useClassDetailQuery = (classId: number) =>
    useQuery({
        queryKey: CLASSES_KEYS.detail(classId),
        queryFn: () => classesApi.getClassDetail(classId),
        enabled: !!classId,
    })

/** 학급별 과제 목록 */
export const useClassAssignmentsQuery = (classId: number) =>
    useQuery({
        queryKey: CLASSES_KEYS.assignments(classId),
        queryFn: () => classesApi.getClassAssignments(classId),
        enabled: !!classId,
    })

/** 학급 참가 */
export const useJoinClassMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (invite_code: string) => classesApi.joinClass(invite_code),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CLASSES_KEYS.all })
            toast.success("학급에 참가했습니다!")
        },
        onError: (error: any) => toast.error(error?.response?.data?.message ?? "학급 참가에 실패했습니다."),
    })
}
