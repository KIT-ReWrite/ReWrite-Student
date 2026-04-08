import AssignmentDetailPage from "@/pages/assignments/AssignmentDetailPage"
import AssignmentsPage from "@/pages/assignments/AssignmentsPage"
import ClassDetailPage from "@/pages/classes/ClassDetailPage"
import ClassesPage from "@/pages/classes/ClassesPage"
import DashboardPage from "@/pages/dashboard/DashBoardPage"
import LoginPage from "@/pages/login/LoginPage"
import SignupPage from "@/pages/signup/SignupPage"
// import AuthGuard from "@/shared/lib/AuthGuard"
import RootRedirect from "@/shared/lib/RootRedirect"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootRedirect />,
        },
        {
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/signup",
                    element: <SignupPage />,
                },
                {
                    // element: <AuthGuard />,
                    children: [
                        {
                            path: "/dashboard",
                            element: <DashboardPage />,
                        },
                        {
                            path: "/classes",
                            element: <ClassesPage />,
                        },
                        {
                            path: "/classes/:id",
                            element: <ClassDetailPage />,
                        },
                        {
                            path: "/assignments",
                            element: <AssignmentsPage />,
                        },
                        {
                            path: "/assignments/:id",
                            element: <AssignmentDetailPage />,
                        },
                    ],
                },
            ],
        },
    ],
    {
        basename: "/",
    }
)
