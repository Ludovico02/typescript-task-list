import { useState } from "react"

interface AddTaskButtonProps {
    onAddTask: (name: string) => void;
}

export default function AddTaskButton({ onAddTask }: AddTaskButtonProps) {
    const [taskName, setTaskName] = useState<string>('');

    const handleAddTask = () => {
        if (!taskName.trim()) return;
        onAddTask(taskName);
        setTaskName('');
    };

    return (
        <div className="relative w-full flex items-center">
            <input
                className="w-full bg-gray-100 rounded-full py-4 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-black"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="New task..."
            />
            <button 
                className="absolute right-0 bg-green-500 hover:bg-green-600 text-white w-15 h-15 rounded-full flex items-center justify-center text-2xl shadow-md transition-transform active:scale-95"
                onClick={handleAddTask}>+</button>
        </div>
    )
}