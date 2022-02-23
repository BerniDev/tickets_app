import { createContext } from 'react';
import { useTicketsList } from '../hooks/useTicketsList';
import { Ticket } from '../types/ticket.types';

interface ProviderProps{
    children: JSX.Element | Array<JSX.Element>
}

interface ContextProps {
    ticketsList: Array<Ticket>
    setTicketsList: (list: Array<Ticket>) => void,
    addTicket: (id:string) => void,
    removeTicket: (id:string) => void
}

export const TicketsListContext = createContext<ContextProps>({} as ContextProps);

export function TicketsListProvider ({children}:ProviderProps){

    const { ticketsList, setTicketsList, addTicket, removeTicket } = useTicketsList([]);

    return (
        <TicketsListContext.Provider value={{ ticketsList, setTicketsList, addTicket, removeTicket }}>
            {children}
        </TicketsListContext.Provider>
    );
}