export interface Task {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_done: boolean;
    created_at: string;
    priority: number;
    due_date?: string;
};

export interface TaskUpdate {
    title?: string
    description?: string
    is_done?: boolean
    priority?: number
    due_date?: string | null
}
