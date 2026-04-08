import { PageLayout } from "@/shared/ui/PageLayout"
import { Card } from "@/shared/ui/Card"
import { ProfileHeader } from "@/features/mypage/ui/ProfileHeader"
import { ProfileForm } from "@/features/mypage/ui/ProfileForm"

function MyPage() {
    return (
        <PageLayout title="마이페이지" description="내 프로필 정보를 관리합니다.">
            <div className="max-w-2xl mx-auto">
                <Card className="p-8">
                    <ProfileHeader />
                    <ProfileForm />
                </Card>
            </div>
        </PageLayout>
    )
}

export default MyPage
