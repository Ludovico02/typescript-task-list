interface TaskProps {
    taskName: string;
    status: boolean;
    onToggle?: () => void;
}

export default function Task({ taskName, status, onToggle }: TaskProps) {
    return (
        <div className="flex justify-between items-center border-b border-t border-gray-300">
            <p className={status ? 'line-through' : ''}>{taskName}</p>
            <input
                type="checkbox"
                checked={status}
                onChange={onToggle}
            />
        </div>
    );
}