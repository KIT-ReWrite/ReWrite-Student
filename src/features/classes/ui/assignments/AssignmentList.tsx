import { AssignmentItem } from "./AssignmentItem"

export function AssignmentList({ assignments }: any) {
    return (
        <div>
            <h2 className="text-lg font-bold text-text-primary mb-4">과제 목록</h2>

            <div className="space-y-4">
                {assignments.length > 0 ? (
                    assignments.map((assignment: any, index: number) => (
                        <AssignmentItem key={assignment.id} assignment={assignment} index={index} />
                    ))
                ) : (
                    <div className="text-center py-16 text-text-secondary bg-white rounded-2xl border border-dashed border-gray-200">
                        아직 등록된 과제가 없습니다.
                    </div>
                )}
            </div>
        </div>
    )
}
