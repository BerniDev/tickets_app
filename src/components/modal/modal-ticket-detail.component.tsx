import Modal from './modal.component';
import { Ticket } from '../../types/ticket.types';
import './modal-ticket-detail.component.scss';

interface ModalTicketDetailProps{
    height?: string,
    ticket: Ticket,
    onCloseModal: ()=>void,
    onAddModal: ()=>void
}

export default function ModalTicketDetail({ ticket, height, onCloseModal, onAddModal }:ModalTicketDetailProps):JSX.Element{
    return(
        <Modal height={height}>
            <h1>{ticket.title}</h1>
            <div className="type-info">
                <label>
                    <b>Type:</b>
                </label>
                <span>{ticket.type}</span>
            </div>
            <p>{ticket.description}</p>
            <div className="button-container">
                <button className="add-button" onClick={()=>onAddModal()}> Add </button>
                <button className="cancel-button" onClick={()=>onCloseModal()}>Cancel</button>
            </div>
        </Modal>
    );
}