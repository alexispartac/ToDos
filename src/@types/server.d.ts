import { ITask } from "./task";

export interface UReq {
    headers: { 
        adminid: string;
    }; 
    body: | { 
                username: string;
                password: string;
            }
    query: {
        userId: string;
    };
};

export interface URes {
    status: (arg0: number) => { 
        (): any;
        new(): any; 
        json: {(
            arg0: { 
                message?: string; 
                error?: string; 
                users?: any; 
                accessToken?: string;
                newUser?: any;
            }): any; 
            new(): any; 
        }; 
    }; 
};


export interface TReq {
    headers: { accesstoken: string } ; 
    body: { 
        id: string;
        description: string;
        status: boolean; 
    };
    query: { id : string };
}

export interface TRes {
    status: (arg0: number) => { 
        (): any; 
        new(): any; 
        json: { 
            (arg0: { 
                message?: string; 
                error?: string;
                tasks?: any;
            }): any; 
            new(): any; 
        }; 
    };  
}

