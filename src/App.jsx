import { createContext, useContext, useState } from 'react';
import './App.css';

const ticketsContext = createContext()




function Place({ children }) {

    const [isBook, setIsBook] = useState(false);

    const ticketsObj = useContext(ticketsContext);

    const handler = () => {
        if (!isBook) {
            const newTickets = [...ticketsObj.value, children]
            ticketsObj.setter(newTickets)
        }
        else {
            if (ticketsObj.value.includes(children)) {
                const index = ticketsObj.value.indexOf(children);
                const newTickets = [...ticketsObj.value];
                newTickets.splice(index, 1)
                ticketsObj.setter(newTickets)
            }
        }
        setIsBook(!isBook);
    }


    return (
        <button onClick={() => { handler() }}
            style={{
                color: isBook ? "white" : "",
                background: isBook ? "#1DE782" : "",

            }}
            className='Book'>
            {children}
        </button>
    )
}

function BookPlaces({ row, col }) {

    const places = []
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            places.push(`${i + 1}-${j + 1}`)
        }
    }

    return (
        <section style={{ gridTemplateColumns: `repeat(${col},50px)` }} className='BookPlaces'>
            {places.map((number) => <Place>{number}</Place>)}
        </section>
    )
}


function InfoBlock({ price }) {

    const ticketsObj = useContext(ticketsContext);

    return (
        <div className='InfoBlock'>
            <div>
                <h5>Сумма</h5>
                <p>{ticketsObj.value.length * price} руб.</p>
            </div>
            <div>
                <h5>Места</h5>
                <p>{ticketsObj.value.join(", ")}</p>
            </div>
            <button>
                Купить
            </button>
        </div>
    )


}



function Book({ price, row, col }) {

    return (
        <>
            <BookPlaces row={row} col={col} />
            <InfoBlock price={price} />
        </>
    )

}




export default function App() {

    const [tickets, setTickets] = useState([])
    const ticketObj = {
        value: tickets,
        setter: setTickets
    }

    return (
        <main>
            <ticketsContext.Provider value={ticketObj}>
                <Book price={700} row={10} col={15} />
            </ticketsContext.Provider>
        </main>
    )
}


