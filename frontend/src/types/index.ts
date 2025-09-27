export interface User {
    _id:string;
    name:string;
    email:string;
    dob:string;
    avatar:string;
    updateAt:string;
    createdAt:string;
}

export interface Note{
    _id:string;
    userId:string;
    title:string;
    content:string;
    createdAt:string;
    updatedAt:string;
}