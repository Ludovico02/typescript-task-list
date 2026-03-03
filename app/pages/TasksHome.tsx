'use client';

import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTaskButton from "../components/AddTaskButton";

export default function TasksHome() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data);
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

    const handleAddTask = async (name: string) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });


        const newTask = await response.json();
        console.log("Task ricevuto dal server:", newTask);
        setTasks(prev => [...prev, newTask]);

    }

    const handleTaskDelete = async (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));

        try {
            await fetch(`/api/tasks?id=${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error("Error while deleting the task: ", error);
        }
    }

    return (
        <div className="min-h-screen w-full bg-blue-400 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md min-h-125">
                <h1 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2 text-black">
                    ToDo List <span className="text-2xl">📋</span>
                </h1>

                <AddTaskButton onAddTask={handleAddTask} />

                <div className="mt-6">
                    <TaskList
                        tasks={tasks}
                        handleCheckboxChange={handleCheckboxChange}
                        onDeleteTask={handleTaskDelete}
                    />
                </div>
            </div>
        </div>
    );
}