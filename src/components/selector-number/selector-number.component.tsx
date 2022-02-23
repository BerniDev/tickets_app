/** Genero este componente aparte para simplificar la tabla de los tickets.
 * No contiene ningún state propio ni lógica propia para no complicar el componente.
 * Toda la lógica necesaria para modificar el state se encuentra en la tabla y
 * en la página principal.
 */

import './selector-number.component.scss';

interface SelectorNumberProps{
    units: number,
    plusOne: ()=>void,
    minusOne: ()=>void
}

export default function SelectorNumber({ units, plusOne, minusOne }: SelectorNumberProps):JSX.Element {

    return (
        <div className="selector-number">
            <button className="plus-button" onClick={()=>plusOne()}>+</button>
            <input key={units}
                type="number" 
                value={units} 
                readOnly
            />
            <button className="minus-button" onClick={()=>minusOne()}>-</button>
        </div>
    );
}