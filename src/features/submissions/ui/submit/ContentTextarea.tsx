export function ContentTextarea({ content, setContent }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
                작성 내용 <span className="text-accent">*</span>
            </label>

            <textarea
                className="notion-textarea min-h-75 text-base p-2 leading-relaxed"
                placeholder="여기에 과제 내용을 작성해주세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <div className="text-right text-xs text-text-secondary mt-2">{content.length} 자</div>
        </div>
    )
}
