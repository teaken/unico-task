export interface User {
    id: number;
    name?: string;
    lastName?: string;
    age?: number | null;
    editMode?: boolean;
}