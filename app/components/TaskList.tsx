import { useEffect, useState } from 'react';
import Task from './Task';

export default function TaskList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data.tasks);
            } catch (error) {
                console.error('Error while fetching data: ', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, []);

    if (loading) return <p>Loading data...</p>

    const handleCheckboxChange = async (id: number) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;

        const updatedTask = { ...taskToUpdate, status: !taskToUpdate.status };
        setTasks(prev =>
            prev.map(task => task.id === id ? updatedTask : task)
        );

        try {
            const response = await fetch('/api/tasks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok)
                throw new Error("Failed to call PUT method...");
        } catch (error) {
            console.error("Error while trying to write on json file: ", error);
            setTasks(prev =>
                prev.map(task => task.id === id ? taskToUpdate : task)
            );
        }
    }

    return (
        <div>
            {tasks.map((task: any) => (
                <Task
                    key={task.id}
                    taskName={task.name}
                    status={task.status}
                    onToggle={() => handleCheckboxChange(task.id)}
                />
            ))}
        </div>
    );
}