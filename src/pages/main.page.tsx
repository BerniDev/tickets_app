import { useEffect, useContext, useState } from 'react';
import TicketsTableComponent from '../components/tickets-table/tickets-table.component';
import { Ticket } from '../types/ticket.types';
import { getTickets } from '../services/fetch.services';
import { sortTicketsListByReleaseDate } from '../utils/sort.utils';
import { TicketsListContext } from '../context/tickets-list.context';
import ModalSummary from '../components/modal/modal-summary.component';
import './main.page.scss';

export default function MainPage():JSX.Element{
    const {ticketsList, setTicketsList} = useContext(TicketsListContext);
    const [isTicketAdded, setIsTicketAdded] = useState<boolean>(false);
    const [showSummary, setShowSummary] = useState<boolean>(false);

    useEffect(()=>{
        getTickets().then((response:Array<Ticket>)=>{
            const sortedList = sortTicketsListByReleaseDate(response);
            setTicketsList(sortedList);
        });
    },[])

    /** Con este useEffect comprobamos si se ha añadido un ticket nuevo a alguno
     * de los eventos de la lista para mostrar el botón del carrito.*/
    useEffect(()=>{
        setIsTicketAdded(():boolean => {
            const aTicketIsAdded = ticketsList && ticketsList.findIndex((ticket:Ticket) => {
                return ticket.units > 0;
            })
            return aTicketIsAdded >= 0;
        })
    },[ticketsList])

    const openSummary = () =>{
        setShowSummary(true);
    }

    const closeModal = () => {
        setShowSummary(false);
    }
    
    return (
        <div className="main-page">
            <h1 className="title">Tickets App</h1>
            {ticketsList ? <TicketsTableComponent />:null}
            {isTicketAdded ? <div className="button-container">
                <button className="app-button" onClick={openSummary}>Chart</button>
            </div>
            : null}
            {showSummary ? <ModalSummary height={'auto'}onCloseModal={closeModal}></ModalSummary> : null}
        </div>
    );
}