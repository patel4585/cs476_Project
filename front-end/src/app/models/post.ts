import { User } from "./user";

export interface Post {
    _id: string,
    user: User; 
    amount_willing_to_pay: number;
    amount_willing_to_pay_currency: string; 
    desired_amount_in_return: number;
    desired_amount_in_return_currency: string; 
    additional_details?: string; 
    createdAt?: Date;
    updatedAt?: Date; 
}
