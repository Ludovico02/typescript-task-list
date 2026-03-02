'use client';

import TaskList from "../components/TaskList";

export default function TasksHome() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <TaskList />
        </div>
    );
}