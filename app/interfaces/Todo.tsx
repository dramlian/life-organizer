export interface Todo {
    id: number;
    content: string;
    done: boolean;
}

export interface TodoDbDto {
    _id: string;
    tasks: Todo[];
}