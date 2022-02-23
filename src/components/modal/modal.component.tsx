/** Genero un componente modal con los estilos y funcionalidades comunes 
 * para las dos modales requeridas en este ejercicio en muy poco código haciendo
 * uso de createPortal para que se generen al nivel de la aplicación y evitar
 * problemas de renderizados en el caso de haber componentes por encima en la
 * jerarquía.
 * Aplicando en este componente sobre todas las modales me permite añadir un 
 * data-test común a través del cual puedo generar tests con mayor facilidad 
 * y localizar todas las modales bajo el mismo identificador.
 * */

import { createPortal } from 'react-dom';
import './modal.component.scss';

interface ModalProps{
    children: JSX.Element | Array<JSX.Element>
    height?: string,
    width?: string,
    onClickBackdrop?: ()=>void,
}

export default function Modal({width, height, children, onClickBackdrop}:ModalProps){

    const portal = document.getElementById('portal');

    const modalStyles = { 
        width: width || '640px', 
        height: height || '360px' 
    };

    return portal ? createPortal(
        <div className="modal" data-test="modal">
            <div className="content" style={modalStyles}>
                {children}
            </div>
            <div className="backdrop" onClick={ onClickBackdrop }/>
        </div>
    ,portal)
    : null;
}