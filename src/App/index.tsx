import React from 'react';

import SearchByName from './SearchByName'
import SearchByLand from './SearchByLand'

type Mode = "choosing" | "searchByName" | "searchByLand"

const ChooseMode = ()=>{
  return <section>
    Hello there!
  </section>
}

function App() {
  //Chooses mode
  const [mode, setMode] = React.useState<Mode>("searchByName");
  return (
    <>
      <h1 className="f-lg">CityPop</h1>
      {
        (mode === "searchByName") ? <SearchByName></SearchByName>:
          (mode === "searchByLand")? <SearchByLand></SearchByLand>:
          <ChooseMode></ChooseMode>
      }
    </>
  )

}

export default App

