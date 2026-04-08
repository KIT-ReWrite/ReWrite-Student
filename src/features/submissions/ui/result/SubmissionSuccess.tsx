import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function SubmissionSuccess() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 mt-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-success w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-3">제출이 완료되었습니다!</h1>
            <p className="text-text-secondary text-lg">AI가 작성하신 글을 분석하고 있습니다.</p>
        </motion.div>
    )
}
