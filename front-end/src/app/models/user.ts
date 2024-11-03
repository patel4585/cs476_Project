export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: "Normal User" | "Admin User";
    password: string;
}
