import { useContext, useState } from 'react';
import { TicketsListContext } from '../../context/tickets-list.context';
import SelectorNumberComponent from '../selector-number/selector-number.component';
import { formatCurrency, formatDate } from '../../utils/format.utils';
import ModalTicketDetail from '../modal/modal-ticket-detail.component';
import { Ticket } from '../../types/ticket.types';
import './tickets-table.component.scss';

export default function EventsTable():JSX.Element {

    const { ticketsList, addTicket, removeTicket } = useContext(TicketsListContext);
    const [selectedTicket, setSelectedTicket] = useState<Ticket>();

    const openDetailModal = (title:string) =>{
        setSelectedTicket(():Ticket|undefined=>{
            const ticketFound = ticketsList.find((ticket:Ticket)=>{
                return ticket.title === title;
            })
            if(ticketFound) return ticketFound;
        })
    }

    const closeModal = () => {
        setSelectedTicket(undefined);
    }

    const addUnitAndCloseModal = () => {
        if(selectedTicket != undefined){
            const { id } = selectedTicket;
            addTicket(id);
        }
        closeModal();
    }

    return(
    
    <div className="events-table">
        { selectedTicket ? 
            <ModalTicketDetail 
                height={'auto'}
                ticket={selectedTicket} 
                onCloseModal={closeModal} 
                onAddModal={addUnitAndCloseModal}
            /> 
        : null}
        
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Release Date</th>
                    <th>Units</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {ticketsList.map((ticket:Ticket, index:number)=>{ return(
                    <tr key={index} >
                        <td className="name" onClick={()=>openDetailModal(ticket.title)}>{ticket.title}</td>
                        <td className="type" onClick={()=>openDetailModal(ticket.title)}>{ticket.type}</td>
                        <td className="release-date" onClick={()=>openDetailModal(ticket.title)}>{formatDate(ticket.releaseDate)}</td>
                        <td className="units">
                            <SelectorNumberComponent
                                units={ticket.units}
                                plusOne={()=>addTicket(ticket.id)}
                                minusOne={()=>removeTicket(ticket.id)}
                            />
                        </td >
                        <td className="price" onClick={()=>openDetailModal(ticket.title)}>{formatCurrency(ticket.price)}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
    )
}