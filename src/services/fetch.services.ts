import { Ticket } from '../types/ticket.types';

export const getTickets = ():Promise<Ticket[]> => {
    const url = 'https://my-json-server.typicode.com/davidan90/demo/tickets';
    return fetch(url).then(response => response.json());
}