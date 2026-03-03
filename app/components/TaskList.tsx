import { useEffect, useState } from 'react';
import Task from './Task';

interface TaskListProps {
    tasks: any[];
    handleCheckboxChange: (id: number) => void;
    onDeleteTask: (id: number) => void;
}

export default function TaskList({ tasks, handleCheckboxChange, onDeleteTask } : TaskListProps) {
    return (
        <div>
            {tasks.map((task: any) => (
                <Task
                    key={task.id}
                    taskName={task.name}
                    status={task.status}
                    onToggle={() => handleCheckboxChange(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                />
            ))}
        </div>
    );
}