/** Genero un custom hook para centralizar la gestión de toda la lógica referente a la 
 * modificación y consulta de los datos de la lista de tickets. Personalmente si un useReducer
 * no requiere de 200 líneas o más de código, prefiero guardar toda la lógica en el mismo hook.
 * En el caso de tener demasiadas líneas de código sacaría el switch del reducer a otro archivo. */
import { useEffect, useReducer } from "react";
import { Ticket } from '../types/ticket.types';

enum ACTIONS {
    MODIFY_LIST,
    ADD_TICKET,
    REMOVE_TICKET
}

interface Reducer {
    type: number,
    payload: any
}

export function useTicketsList(initialState:Array<Ticket>|null) {

    const hasUnits = (newList:Array<Ticket>):boolean => {
        const noUnitsTicket = newList.find( (ticket:Ticket)=> {
             return ticket.units == undefined
        } );
        return noUnitsTicket === undefined;
    }

    /**Al referirnos con si hay datos formateados nos referimos a si contiene el campo units
     * que no viene por defecto de la API. */
    const isThereFormatedDataInLocalStorage = () =>{
        let listInLocalStorage = localStorage.getItem('ticketsList');

        if (listInLocalStorage != null && typeof listInLocalStorage === "string"){
            listInLocalStorage = JSON.parse(<string>listInLocalStorage)
            if(Array.isArray(listInLocalStorage) && listInLocalStorage.length > 0 && hasUnits(listInLocalStorage)){
                return true;
            }
        }
        return false;
    }

    const ticketsListReducer = (state:any, action:Reducer) =>{
        let newState = JSON.parse(JSON.stringify(state));
        switch(action.type){
            case ACTIONS.MODIFY_LIST:
                /** Guardamos la ejecicuión en una variable para no lanzarla la comprobación más de una vez */
                const hasAFormatedLocalStorage = isThereFormatedDataInLocalStorage();
                /**Con la siguiente comprobación consideramos si tenemos que formatear los datos para
                 * incluir las unidades que por defecto no vienen de la API, tanto si es la primera vez
                 * que consultamos a la API, como si la llamada anterior no incluyó un registro de datos
                 * y se guardaron en el localStorage. */
                if(hasUnits(action.payload) === false && hasAFormatedLocalStorage === false){
                    const newStateList = action.payload.map((ticket:Ticket)=>{
                        ticket.units = 0;
                        return ticket;
                    })
                    return newStateList;
                }
                /**Al refrescar la aplicación el en el localStorage si tenemos los datos los devolvemos en el 
                 * caso de que estemos recargando la página y no hayamos inicializado antes los datos */
                return hasAFormatedLocalStorage ? newState : action.payload;

            case ACTIONS.ADD_TICKET:
                const indexA = newState.findIndex((ticket:Ticket)=>{
                    return ticket.id === action.payload;
                })
                if(indexA >= 0){
                    const newTicketState = newState[indexA];
                    newState[indexA] = {...newTicketState, units: newTicketState.units + 1 }
                }
                return newState;
             
            case ACTIONS.REMOVE_TICKET:
                const indexR = newState.findIndex((ticket:Ticket)=>{
                    return ticket.id === action.payload;
                })
                if(indexR >= 0 && newState[indexR].units > 0){
                    const newTicketState = newState[indexR];
                    newState[indexR] = {...newTicketState, units: newTicketState.units - 1 }
                    return newState;
                }
                return state;

            default:
                return state;
        }
    }

    /** Este método init se pasa al useReducer como tercer parámetro pudiendo manipular el estado
     * inicial del hook desde aquí. Lo que hacemos es que si tenemos datos en el localStorage devuelve
     * lo que haya almacenado ahi y si no tiene información, recupera el estado inicial del que se
     * le pasa por parámetros al invocar a este custom hook. */
    const init = () => {
        const stringState = localStorage.getItem('ticketsList')
        return stringState ? JSON.parse(stringState) : initialState;
    }

    const [ ticketsList, dispatch ] = useReducer(ticketsListReducer, initialState, init);

    useEffect(()=>{
        localStorage.setItem('ticketsList', JSON.stringify(ticketsList))
    },[ticketsList]);

    const setTicketsList = (list: Array<Ticket>) => {
        dispatch({type:ACTIONS.MODIFY_LIST, payload: list});
    }

    const addTicket = (id:string) => {
        dispatch({type:ACTIONS.ADD_TICKET, payload: id});
    }

    const removeTicket = (id:string) => {
        dispatch({type:ACTIONS.REMOVE_TICKET, payload: id});
    }

    return {
        ticketsList,
        setTicketsList,
        addTicket,
        removeTicket
    }
}