import { useContext, useEffect, useState } from 'react';
import { TicketsListContext } from '../../context/tickets-list.context';
import { Ticket } from '../../types/ticket.types';
import { formatCurrency } from '../../utils/format.utils';
import Modal from './modal.component';
import './modal-summary.component.scss';

interface ModalSummaryProps{
    height: string,
    onCloseModal: ()=>void,
}

export default function ModalSummary({ height, onCloseModal }:ModalSummaryProps){

    const { ticketsList } = useContext(TicketsListContext);
    const [selectedEvents, setSelectedEvents] = useState<Array<Ticket>>([]);

    useEffect(()=>{
        const newEvents = ticketsList.filter((ticket:Ticket)=>{
            if (ticket.units > 0) return  ticket;
        })
        newEvents.sort((ticketA:Ticket, ticketB:Ticket) =>{
            return  ticketB.units - ticketA.units;
        });
        setSelectedEvents(newEvents);
    },[])

    const getTotalPrice = ():string =>{
        let sumPrices = 0;
        selectedEvents.forEach((ticket:Ticket)=>{
            sumPrices += ticket.units * ticket.price;
        })
        return formatCurrency(sumPrices);
    }

    return (
    <Modal height={height} onClickBackdrop={onCloseModal}>
        <div className="modal-summary" >
            <h1>Modal Summary</h1>
            {selectedEvents.length > 0 ? 
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className='name' >Name</th>
                                <th className='units' >Units</th>
                                <th className='price' >Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedEvents.map((ticket:Ticket, index:number)=>{
                                return (
                                <tr key={index}>
                                    <td className='name' >{ticket.title}</td>
                                    <td className='units' >{ticket.units}</td>
                                    <td className='price' >{formatCurrency(ticket.price * ticket.units)}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                    <div className="total-price">
                        <span ><b>Total price:</b>{getTotalPrice()}</span>
                    </div>
                </div>
                :null}
        </div>
    </Modal>);
}