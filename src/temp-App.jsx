import { createContext, useContext, useState } from 'react';
import './App.css';

const favoriteCards = createContext()

function Card({ index }) {

  const favoriteObject = useContext(favoriteCards)

  const appendObject = () => {
    const array = [...favoriteObject.list, index];
    console.log(array);
    favoriteObject.command(array);

  }

  return (
    <div className='Card'>
      <p>Карточка №{index}</p>
      <button onClick={() => appendObject()}>В избранное</button>
    </div>
  )
}

function CardList({ children }) {

  return (
    <section className='CardList'>
      <h2>Список карточек</h2>
      <div>
        {children}
      </div>
    </section>
  )
}

function FavoriteList({ children }) {
  return (

    <section className='FavoriteList'>
      <h2>Избранное</h2>
      <div>
        {children}
      </div>
    </section>
  )
}


function App() {

  const cardList = []
  for (let i = 0; i < 20; i++) {
    cardList.push(i);
  }

  const [favoriteList, setFavoriteList] = useState([])

  const favoriteObject = {
    "list": favoriteList,
    "command": setFavoriteList
  }

  return (
    <favoriteCards.Provider value={favoriteObject}>
      <main>
        <CardList>
          {cardList.map((item, index) => <Card index={index}></Card>)}
        </CardList>
        <FavoriteList>

          {favoriteList.length == 0 && <p>Пока ничего не добавлено</p>}
          {favoriteList.length > 0 && favoriteList.map((item, index) => <p>{index}. {item}</p>)}
        </FavoriteList>
      </main>
    </favoriteCards.Provider>
  )


}

export default App;
