export interface User {
    id : number;
    username : string;
    email : string;
    password : string
}

export interface Todo {
    id : number;
    userId : number;
    title : string
}

export interface Payload {
    userId : number;
    username : string
}

export interface AuthRequest extends Request {
    user? : Payload
}