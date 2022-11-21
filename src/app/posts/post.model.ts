import { User } from "./users.model";

export interface Post{
    id: string;
    name: string;
    surname: string;
    phone: string;
    carNumber: string;
    brand: string;
    mechanics: Array<User>;
    comment: string;
    problem: string;
    startDate: string;
    endDate: string;
    status: string;
}