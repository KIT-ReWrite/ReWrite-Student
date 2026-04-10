export const API_PATH = {
    AUTH: {
        SIGNUP: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
    },
    USER: {
        ME: "/users/me",
        PROFILE_IMAGE: "/users/me/profile-image",
        BY_ID: (id: string) => `/users/${id}`,
    },
    ASSIGNMENTS: {
        LIST: "/assignments",
        DETAIL: (id: number) => `/assignments/${id}`,
    },
    CLASSES: {
        LIST: "/classes",
        DETAIL: (id: number) => `/classes/${id}`,
        JOIN: "/classes/join",
        ASSIGNMENTS: (id: number) => `/classes/${id}/assignments`,
    },
    SUBMISSIONS: {
        LIST: (assignmentId: number) => `/assignments/${assignmentId}/submissions`,
        DETAIL: (id: number) => `/submissions/${id}`,
        SUBMIT: (assignmentId: number) => `/assignments/${assignmentId}/submit`,
        UPDATE: (id: number) => `/submissions/${id}`,
        AI_FEEDBACK: (id: number) => `/submissions/${id}/ai-feedback`,
        TEACHER_FEEDBACK: (id: number) => `/submissions/${id}/teacher-feedback`,
    },
    STUDENTS: {
        METRICS: (studentId: string) => `/students/${studentId}/metrics`,
        SCORES: (studentId: string) => `/students/${studentId}/scores`,
    },
} as const
