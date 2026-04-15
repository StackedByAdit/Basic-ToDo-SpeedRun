export interface User {
    id : number;
    username : string;
    email : string;
    password : string
}

export interface Todo {
    id : number;
    userId : string;
    title : string
}

export interface Payload {
    userId : string;
    username : string
}

export interface AuthRequest extends Request {
    user? : Payload
}