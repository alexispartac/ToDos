import { ITask } from "../@types/task"


export type Props = {
    children : React.ReactNode;
    userToken : string
};

type TProps = {
    task: ITask;
    userToken: string
};