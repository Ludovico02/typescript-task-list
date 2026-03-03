interface TaskProps {
    taskName: string;
    status: boolean;
    onToggle?: () => void;
    onDelete?: () => void;
}

export default function Task({ taskName, status, onToggle, onDelete }: TaskProps) {
    return (
        <div className="flex justify-between items-center bg-gray-400 hover:bg-gray-500 p-4 rounded-xl mb-3 transition-all duration-200 border border-transparent hover:border-gray-600">
            <p className={`text-black font-medium transition-all ${status ? "line-through text-gray-700" : ""}`}>{taskName}</p>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    checked={status}
                    onChange={onToggle}
                />
                <button
                    className="text-black hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    onClick={onDelete}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}