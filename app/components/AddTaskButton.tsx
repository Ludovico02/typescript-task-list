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
        <div>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="New task..."
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    )
}