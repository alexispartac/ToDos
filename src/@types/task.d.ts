
export interface ITask {
    id: string;
    description: string;
    status: boolean;
}

export interface BTask extends ITask {
    userId: string;
    _id?: any;
}

export type TaskDispatch =  | { description: string; type: 'add' }
                            | { id: string; type: 'delete'}
                            | { data: any; type: 'tasks'};

