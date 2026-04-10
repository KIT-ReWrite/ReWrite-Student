import { motion } from "framer-motion"

interface Tab {
    id: string
    label: string
}

interface Props {
    tabs: Tab[]
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function AssignmentTabs({ tabs, activeTab, setActiveTab }: Props) {
    return (
        <div className="flex space-x-1 bg-gray-100/50 p-1 rounded-xl w-full max-w-md mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all relative
              ${activeTab === tab.id ? "text-primary" : "text-text-secondary hover:text-text-primary"}`}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white rounded-lg shadow-sm"
                            initial={false}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    )
}
