import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'tasks.json');

export async function GET() {
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        return NextResponse.json(data.tasks);
    } catch (error) {
        return NextResponse.json({ error: "Errore nella lettura dei dati" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedTask = await request.json();

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const taskIndex = data.tasks.findIndex((task: any) => task.id === updatedTask.id);
        if (taskIndex != -1) {
            data.tasks[taskIndex] = updatedTask;
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error while writing the file..." }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newTaskName = await request.json();

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        const updateId: number = data.lastId + 1;

        const newTask = {
            id: updateId,
            name: newTaskName.name,
            status: false
        };

        data.tasks.push(newTask);
        data.lastId = updateId;

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json(newTask);
    } catch (error) {
        return NextResponse.json({ error: "Error while adding task to tasks.json" });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Missing element ID..." }, { status: 400 });
        }

        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);

        data.tasks = data.tasks.filter((task: any) => task.id !== parseInt(id));

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Error while deleting data" }, { status: 500 });
    }
}