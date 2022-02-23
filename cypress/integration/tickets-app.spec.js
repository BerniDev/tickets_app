/**@desc No importo los métodos que uso en la aplicación para asegurar que los test cumplen los criterios esperados independientemente de que se
 * puedan modificar los métodos originales del código de la página o no.
 */
const sortTicketsListByReleaseDate = (ticketList) => {
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

    /**@desc Datos que sabemos que va a devolver la API */
    const responseMock = [
        {
            "id": "1a",
            "title": "Johnny Cash tribute",
            "type": "show",
            "releaseDate": 1555970400000,
            "description": "Mauris finibus commodo malesuada. Vestibulum porttitor, massa a gravida faucibus, augue velit tristique libero, sit amet scelerisque tortor erat ut velit. Praesent orci tellus, aliquam id felis vitae, laoreet facilisis.",
            "price": 15,
            "currency": "euro"
        },
        {
            "id": "7p",
            "title": "action for happinness",
            "type": "talk",
            "releaseDate": 1634680800000,
            "description": "Donec facilisis quis risus ut blandit. Morbi iaculis vel nisi ut cursus. In vel imperdiet odio, imperdiet mollis diam. Nulla vulputate orci arcu, sed tincidunt est tempor et. Aenean at.",
            "price": 9,
            "currency": "euro"
        },
        {
            "id": "2e",
            "title": "vegan for beginners",
            "type": "talk",
            "releaseDate": 1538344800000,
            "description": "Curabitur eget magna dui. Nam risus ligula, sagittis eget malesuada eu, blandit eget urna. Sed dignissim ante id quam feugiat, eget dictum libero sollicitudin. Aliquam a urna nec leo efficitur facilisis.",
            "price": 8.5,
            "currency": "euro"
        },
        {
            "id": "9t",
            "title": "ghost",
            "type": "musical",
            "releaseDate": 1607554800000,
            "description": "Maecenas porta orci interdum lacus varius, at egestas turpis consequat. Mauris ac condimentum metus. Aenean viverra interdum porta. Nunc laoreet a libero sed finibus. Suspendisse vitae dictum magna. In ut elementum.",
            "price": 25,
            "currency": "euro"
        },
        {
            "id": "6p",
            "title": "the lion king",
            "type": "musical",
            "releaseDate": 1497304800000,
            "description": "In mollis ipsum quis interdum bibendum. Sed sed quam vehicula nunc interdum vestibulum vel quis quam. Nulla sed sagittis odio. Etiam ultricies venenatis elit, quis rhoncus magna commodo nec. Aliquam.",
            "price": 35,
            "currency": "euro"
        },
        {
            "id": "6t",
            "title": "metallica",
            "type": "show",
            "releaseDate": 1623276000000,
            "description": "Duis ex ex, porta vitae pellentesque nec, lobortis id eros. Ut rutrum gravida purus, vitae vestibulum magna aliquet ac. Vestibulum in ornare augue. Aenean pellentesque odio at sodales tempor. Aliquam at rhoncus risus. Ut semper orci.",
            "price": 50,
            "currency": "euro"
        },
        {
            "id": "3n",
            "title": "virtual cook",
            "type": "show",
            "releaseDate": 1609542000000,
            "description": "Pellentesque quis semper mauris. Mauris pretium lobortis ligula, a dictum ante. Praesent vulputate arcu ac orci pretium facilisis. Ut dictum, quam ac interdum rhoncus, tortor metus feugiat nulla, vel semper.",
            "price": 0,
            "currency": "euro"
        }
    ];

    const orderedList = sortTicketsListByReleaseDate(responseMock);

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
        .its('body')
        .should('deep.eq',responseMock);
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