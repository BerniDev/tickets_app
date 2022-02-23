export interface TicketApiResponse{
    id: string,
    title: string,
    type: string, 
    releaseDate: number, 
    price: number,
    description: string,
}

export interface Ticket extends TicketApiResponse{
    units: number,
}