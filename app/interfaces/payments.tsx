export interface Payment {
    id: number;
    content: string;
    done: boolean;
}

export interface PaymentDbDto {
    _id: string;
    tasks: Payment[];
}