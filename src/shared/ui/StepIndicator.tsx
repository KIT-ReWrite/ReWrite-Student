import { Fragment } from "react"
import { Check } from "lucide-react"
interface StepIndicatorProps {
    currentStep: number
    steps: string[]
}
export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
    return (
        <div className="flex items-center w-full mb-8">
            {steps.map((step, index) => {
                const isCompleted = index + 1 < currentStep
                const isCurrent = index + 1 === currentStep
                return (
                    <Fragment key={step}>
                        <div className="flex flex-col items-center relative">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors z-10
                  ${isCompleted ? "bg-primary text-white" : isCurrent ? "bg-primary text-white ring-4 ring-primary-light" : "bg-gray-100 text-gray-400"}`}
                            >
                                {isCompleted ? <Check size={16} /> : index + 1}
                            </div>
                            <span
                                className={`absolute top-10 text-xs whitespace-nowrap font-medium
                ${isCurrent ? "text-primary" : isCompleted ? "text-text-primary" : "text-gray-400"}`}
                            >
                                {step}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex-1 h-0.5 mx-2 bg-gray-100">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{
                                        width: isCompleted ? "100%" : "0%",
                                    }}
                                />
                            </div>
                        )}
                    </Fragment>
                )
            })}
        </div>
    )
}
