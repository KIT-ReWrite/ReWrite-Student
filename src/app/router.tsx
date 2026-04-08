import AnalysisPage from "@/pages/analysis/AnalysisPage"
import AssignmentDetailPage from "@/pages/assignments/AssignmentDetailPage"
import AssignmentsPage from "@/pages/assignments/AssignmentsPage"
import ClassDetailPage from "@/pages/classes/ClassDetailPage"
import ClassesPage from "@/pages/classes/ClassesPage"
import DashboardPage from "@/pages/dashboard/DashBoardPage"
import LoginPage from "@/pages/login/LoginPage"
import MyPage from "@/pages/mypage/MyPage"
import SignupPage from "@/pages/signup/SignupPage"
import FeedbackPage from "@/pages/submissions/FeedbackPage"
import ResultPage from "@/pages/submissions/ResultPage"
import SubmitPage from "@/pages/submissions/SubmitPage"
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
                            path: "/mypage",
                            element: <MyPage />,
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
                        {
                            path: "/assignments/:id/submit",
                            element: <SubmitPage />,
                        },
                        {
                            path: "/analysis",
                            element: <AnalysisPage />,
                        },
                        {
                            path: "/submissions/:id",
                            element: <ResultPage />,
                        },
                        {
                            path: "/submissions/:id/feedback",
                            element: <FeedbackPage />,
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
