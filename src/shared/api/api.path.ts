export const API_PATH = {
    AUTH: {
        SIGNUP: "/auth/register",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
    },
    USER: {
        ME: "/users/me",
        PROFILE_IMAGE: "/users/me/profile-image",
    },
    DASHBOARD: {
        TEACHER: "/dashboard/teacher",
    },
    CLASSES: {
        LIST: "/classes",
        DETAIL: (id: number) => `/classes/${id}`,
        STATS: (id: number) => `/classes/${id}/stats`,
        ASSIGNMENTS: (id: number) => `/classes/${id}/assignments`,
    },
    ASSIGNMENTS: {
        LIST: "/assignments",
        DETAIL: (id: number) => `/assignments/${id}`,
    },
} as const
