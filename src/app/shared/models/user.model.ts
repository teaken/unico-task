export interface User {
    id: number;
    name?: string;
    lastName?: string;
    salary?: number | null;
    editMode?: boolean;
}