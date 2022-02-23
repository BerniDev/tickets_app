import {Ticket} from '../types/ticket.types';

export const sortTicketsListByReleaseDate = (ticketList: Array<Ticket>):Array<Ticket> => {
    const sortedList = ticketList.sort((ticketA: Ticket, ticketB: Ticket)=>{
        return  ticketA.releaseDate - ticketB.releaseDate;
    })
    return sortedList;
}
