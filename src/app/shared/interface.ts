export interface IUserLogin {
    username: string;
    password: string;
}

export interface IEmployee {
    username: string
    firstName: string
    lastName: string
    email: string
    birthDate: Date
    basicSalary: number
    status: string
    group: string
    description: string
}

export interface ResponseLogin {
    success: boolean
    token: string
}