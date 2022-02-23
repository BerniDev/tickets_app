import { fireEvent, render, screen } from "@testing-library/react";
import SelectorNumber from "./selector-number.component";

describe("SelectorNumber component", () => {

    const plusHandler = jest.fn();
    const minusHandler = jest.fn();
    
    beforeEach(() => {
        render(<SelectorNumber 
            units={0} 
            plusOne={plusHandler} 
            minusOne={minusHandler} 
        />);
    });

    test('renders the component', () => {
        const plusButton = screen.getByText('+');
        const minusButton = screen.getByText('-');
        const inputNumber = screen.getByDisplayValue('0');
        
        expect(plusButton).toBeInTheDocument();
        expect(minusButton).toBeInTheDocument();
        expect(inputNumber).toBeInTheDocument();
    });

    test('check callback plus button is called', ()=>{
        const plusButton = screen.getByText('+');
        fireEvent.click(plusButton);
        expect(plusHandler).toHaveBeenCalledTimes(1);
    });

    test('check callback minus button is called', ()=>{
        const minusButton = screen.getByText('-');
        fireEvent.click(minusButton);
        expect(minusHandler).toHaveBeenCalledTimes(1);
    });
});