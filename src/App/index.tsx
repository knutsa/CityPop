import React from 'react';
import logo from './logo.svg';

import SearchByName from './SearchBarName'
import SearchByLand from './SearchBarLand'

type Mode = "choosing" | "searchByName" | "searchByLand"

const ChooseMode = ()=>{
  return <section>
    Hello there!
  </section>
}

function App() {
  const [mode, setMode] = React.useState<Mode>("choosing");
  if(mode === "choosing")
    return <ChooseMode></ChooseMode>
  if(mode === "searchByName")
    return <SearchByName></SearchByName>
  if(mode === "searchByLand")
    return <SearchByLand></SearchByLand>
}

export default App

