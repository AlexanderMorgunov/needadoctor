export interface IPatients {
    id: string;
    name: string;
    age?: number;
    phone: string;
    email?: string;
    complaints: string;
    other?: string;
    severity: number
    date: string;
    dateCreated: number;
    status: 'active' | 'confirmed' | 'canceled'
}