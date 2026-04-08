import type { Role, SubmissionStatus } from "./submission.type"

export const currentUser = {
    id: 1,
    role: "student" as Role, // Toggle this to 'teacher' to test teacher views
    username: "student1",
    name: "김지민",
    school: "서울고등학교",
    student_number: "20401",
    profile_image: "https://i.pravatar.cc/150?u=1",
}

export const currentTeacher = {
    id: 2,
    role: "teacher" as Role,
    username: "teacher1",
    name: "이선생",
    school: "서울고등학교",
    subject: "국어",
    profile_image: "https://i.pravatar.cc/150?u=2",
}

export const mockClasses = [
    {
        id: 1,
        name: "2학년 4반 국어",
        teacher_id: 2,
        teacher_name: "이선생",
        invite_code: "KOR204",
        student_count: 25,
    },
    {
        id: 2,
        name: "심화 논술반",
        teacher_id: 2,
        teacher_name: "이선생",
        invite_code: "ESSAY1",
        student_count: 15,
    },
]

export const mockAssignments = [
    {
        id: 1,
        class_id: 1,
        class_name: "2학년 4반 국어",
        title: "윤동주 시인의 작품 세계 분석",
        description:
            "윤동주 시인의 대표작 3편을 골라, 시대적 배경과 시어의 상징적 의미를 중심으로 분석하는 에세이를 작성하세요. (1,500자 내외)",
        due_date: "2026-04-10T23:59:00",
        status: "not_submitted" as SubmissionStatus,
    },
    {
        id: 2,
        class_id: 1,
        class_name: "2학년 4반 국어",
        title: "고전문학 현대적 재해석",
        description: "춘향전을 현대 사회의 관점에서 재해석하여 짧은 소설 형태로 작성하세요.",
        due_date: "2026-04-05T23:59:00",
        status: "submitted" as SubmissionStatus,
    },
    {
        id: 3,
        class_id: 2,
        class_name: "심화 논술반",
        title: "인공지능 시대의 윤리적 과제",
        description:
            "최근 AI 기술 발전에 따른 윤리적 문제점들을 제시하고, 이에 대한 해결 방안을 논리적으로 서술하세요.",
        due_date: "2026-03-28T23:59:00",
        status: "feedback_ready" as SubmissionStatus,
    },
    {
        id: 4,
        class_id: 2,
        class_name: "심화 논술반",
        title: "환경 문제와 기업의 책임",
        description: "ESG 경영의 중요성과 실제 기업 사례를 분석하세요.",
        due_date: "2026-03-15T23:59:00",
        status: "graded" as SubmissionStatus,
    },
]

export const mockSubmissions = [
    {
        id: 101,
        assignment_id: 3,
        student_id: 1,
        student_name: "김지민",
        text_content:
            "인공지능 기술의 급격한 발전은 우리 삶에 많은 편의를 가져다주었지만, 동시에 심각한 윤리적 과제를 안겨주고 있습니다. 첫째, 데이터 편향성 문제입니다. AI는 학습 데이터에 내재된 편견을 그대로 답습하거나 증폭시킬 위험이 있습니다. 둘째, 책임 소재의 불분명성입니다. 자율주행 자동차 사고나 의료 AI의 오진 시 누구에게 책임을 물어야 할지 명확한 기준이 부족합니다. 셋째, 일자리 감소와 불평등 심화 문제입니다. 단순 반복 업무뿐만 아니라 전문직 영역까지 AI가 대체하면서 사회적 양극화가 우려됩니다. 이러한 문제를 해결하기 위해서는 개발 단계부터 윤리 가이드라인을 엄격히 적용하고, 알고리즘의 투명성을 확보해야 합니다. 또한, AI로 인해 소외되는 계층을 위한 사회적 안전망 구축과 재교육 프로그램이 필수적입니다.",
        image_url: null,
        status: "feedback_ready" as SubmissionStatus,
        submitted_at: "2026-03-27T14:30:00",
        ai_feedback: {
            summary: "논리적인 구조를 갖추고 있으나, 구체적인 사례 제시가 부족합니다.",
            feedback:
                "서론, 본론, 결론의 구조가 명확하고 세 가지 주요 문제점(데이터 편향성, 책임 소재, 일자리 문제)을 잘 짚어냈습니다. 하지만 각 문제점에 대한 구체적인 실제 사례나 통계 자료가 뒷받침되지 않아 주장의 설득력이 다소 떨어집니다.",
            improvement:
                "1. 데이터 편향성의 예시(예: 채용 AI의 성차별 사례)를 추가해보세요.\n2. 해결 방안 부분에서 현재 논의되고 있는 구체적인 법적/제도적 장치를 언급하면 더 좋은 글이 될 것입니다.",
        },
        teacher_feedback: null,
    },
    {
        id: 102,
        assignment_id: 4,
        student_id: 1,
        student_name: "김지민",
        text_content:
            "최근 기업 경영에서 ESG(환경, 사회, 지배구조)는 선택이 아닌 필수가 되었습니다. 특히 환경(E) 분야에서의 책임이 강조되고 있습니다. 파타고니아와 같은 기업은 친환경 소재 사용과 재활용 캠페인을 통해 소비자들의 긍정적인 반응을 이끌어냈습니다. 반면, 그린워싱(위장환경주의)으로 비판받는 기업들도 늘어나고 있습니다. 기업은 단순히 이윤 창출을 넘어 사회적 책임을 다해야 하며, 정부는 이를 객관적으로 평가할 수 있는 명확한 기준을 마련해야 합니다.",
        image_url: null,
        status: "graded" as SubmissionStatus,
        submitted_at: "2026-03-14T09:15:00",
        ai_feedback: {
            summary: "핵심 개념을 잘 이해하고 적절한 사례를 제시했습니다.",
            feedback:
                "ESG의 개념과 파타고니아라는 적절한 긍정적 사례를 잘 제시했습니다. 그린워싱에 대한 언급도 시의적절합니다.",
            improvement:
                "그린워싱의 구체적인 사례를 하나 더 추가하고, 기업이 진정성 있는 친환경 경영을 하기 위한 구체적인 실천 방안을 제안해보면 좋겠습니다.",
        },
        teacher_feedback: {
            score: 85,
            feedback:
                "전반적으로 글의 흐름이 매끄럽고 핵심을 잘 짚었습니다. 다만 결론부에서 정부의 역할뿐만 아니라 소비자의 역할에 대해서도 언급했다면 더 풍성한 논의가 되었을 것입니다. 수고했습니다.",
        },
    },
]

export const mockStudents = [
    {
        id: 1,
        name: "김지민",
        student_number: "20401",
        submission_rate: 95,
        recent_score: 85,
    },
    {
        id: 3,
        name: "이도현",
        student_number: "20402",
        submission_rate: 70,
        recent_score: 75,
    },
    {
        id: 4,
        name: "박서연",
        student_number: "20403",
        submission_rate: 100,
        recent_score: 92,
    },
    {
        id: 5,
        name: "최준호",
        student_number: "20404",
        submission_rate: 45,
        recent_score: 60,
    },
]

export const mockLearningStats = {
    weak_points: ["구체적 사례 제시 부족", "결론부 요약 미흡", "문단 간 연결성 부족"],
    weekly_scores: [
        { week: "3월 1주", score: 75 },
        { week: "3월 2주", score: 78 },
        { week: "3월 3주", score: 82 },
        { week: "3월 4주", score: 85 },
    ],
    radar_data: [
        { subject: "논리성", A: 85, fullMark: 100 },
        { subject: "표현력", A: 70, fullMark: 100 },
        { subject: "이해력", A: 90, fullMark: 100 },
        { subject: "창의성", A: 75, fullMark: 100 },
        { subject: "어휘력", A: 80, fullMark: 100 },
    ],
}
