import React from 'react';

import SearchByName from './SearchBarName'
import SearchByLand from './SearchBarLand'

type Mode = "choosing" | "searchByName" | "searchByLand"

const ChooseMode = ()=>{
  return <section>
    Hello there!
  </section>
}

function App() {
  //Chooses mode
  const [mode, setMode] = React.useState<Mode>("choosing");
  if(mode === "searchByName")
  return <SearchByName></SearchByName>
  if(mode === "searchByLand")
  return <SearchByLand></SearchByLand>
  return <ChooseMode></ChooseMode>
}

export default App

