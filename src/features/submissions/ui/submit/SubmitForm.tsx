import { useState } from "react"
import { Card } from "@/shared/ui/Card"

import { ContentTextarea } from "./ContentTextarea"
import { ImageUploadBox } from "./ImageUploadBox"
import { SubmitActions } from "./SubmitActions"

export function SubmitForm({ onSubmit, onCancel }: any) {
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        setIsSubmitting(true)

        setTimeout(() => {
            setIsSubmitting(false)
            onSubmit()
        }, 1500)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="p-6 sm:p-8 mb-6">
                <div className="space-y-6">
                    <ContentTextarea content={content} setContent={setContent} />
                    <ImageUploadBox />
                </div>
            </Card>

            <SubmitActions isSubmitting={isSubmitting} content={content} onCancel={onCancel} />
        </form>
    )
}
