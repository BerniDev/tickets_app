/**@desc No importo los métodos que uso en la aplicación para asegurar que los test cumplen los criterios esperados independientemente de que se
 * puedan modificar los métodos originales del código de la página o no.
 */
const sortTicketsListByReleaseDate = (ticketList) => {
    console.log(ticketList)
    ticketList = JSON.parse(JSON.stringify(ticketList));
    const sortedList = ticketList.sort((ticketA, ticketB)=>{
        return  ticketA.releaseDate - ticketB.releaseDate;
    })
    return sortedList;
}

const formatCurrency = (price) => {
    return price.toLocaleString('es-ES', {style:'currency',currency:'EUR'})
}


describe('Tickets App', ()=>{
    let orderedList;

    /**@desc Solo necesitamos hacer una visita a la página para realizar todos los tests*/
    before(()=>{
        cy.visit('http://localhost:3000')
    });

    it('Main page can be opened', ()=>{
        cy.contains('Tickets App');
    });

    it("There is a table with columns Name, Type, Release Date, Units and Price",()=>{
        cy.get('table').should('contain','Name')
            .and('contain','Type')
            .and('contain','Release Date')
            .and('contain','Units')
            .and('contain','Price');
    });

    it("Waiting request response and check response",()=>{
        cy.request('https://my-json-server.typicode.com/davidan90/demo/tickets')
        .then(response=>{
            expect(response.status).to.eq(200);
            orderedList = sortTicketsListByReleaseDate(response.body);
            cy.log(orderedList);
        })
    })

    it("Check that the table renders the response from the API ordered by Release Date",()=>{
        cy.get('table tbody tr:first')
            .should('contain',orderedList[0].title)
            .and('contain',orderedList[0].type)
    })

    it("Button Chart should not be rendered",()=>{
        cy.get('button').contains('Chart').should('not.exist');
    })

    it("Clicking on the add ticket button from the first row the unit change",()=>{
        cy.get('table button:first').click()
        cy.get('table input:first').should('have.value', '1');
    })

    it("Button Chart should be rendered",()=>{
        cy.get('button').contains('Chart').should('exist');
    })

    it("Clicking on a row a modal with the description its open",()=>{
        cy.get('table td:first').click()
        cy.get('[data-test=modal]').contains(orderedList[0].description);
    })

    it("Check that clicking on Add button from modal, it close the modal and add a unit to the first event",()=>{
        cy.get('button').contains('Add').click()
        cy.contains(orderedList[0].description).should('not.exist');
        cy.get('table input:first').should('have.value', '2');
    })

    it("Click on Chart button should open a modal with the event wich ticket has been added",()=>{
        const totalPrice = formatCurrency(orderedList[0].price * 2);
        cy.get('button').contains('Chart').click();
        cy.get('[data-test=modal]')
            .should('contain',orderedList[0].title)
            .and('contain',totalPrice)
    })  
})