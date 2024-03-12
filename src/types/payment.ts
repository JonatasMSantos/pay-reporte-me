export type PaymentType = {
    id: number,
    due_date: Date | null,
    title: string,
    note: string,
    done: boolean,
}