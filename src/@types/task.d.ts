
export interface ITask {
    id: string;
    description: string;
    status: boolean;
}

export interface BTask extends ITask {
    userId: string;
    _id?: any;
}

export type TaskContextType = {
    tasks: ITask[];
    saveTask: (task: ITask) => any;
    deleteTask: (id: string) => void;
};
