export interface IPatient {
    id: string | undefined;
    date: {};
    phone: string;
    prefix: string;
    user: {
        age?: number;
        complaints: [];
        email?: string;
        name: string;
        other?: string;
        severity: number;
    }
}