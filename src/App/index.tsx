import React from 'react';

import SearchByName from './SearchByName'
import SearchByLand from './SearchByLand'
import {BackBtn} from './ReusableComponents'

type Mode = "choosing" | "searchByName" | "searchByLand"

const optionStyle: React.CSSProperties = {
  backgroundColor: "var(--secondary)",
  color: "var(--light)",
  padding: "1rem",
  borderRadius: "5px"
}

const ChooseMode: React.FC<{setMode: React.Dispatch<React.SetStateAction<Mode>>}> = ({setMode})=>{
  return <section className="d-flex justify-content-around w-100 mt-3">
    <button style={optionStyle} onClick={()=>setMode("searchByLand")}>Search By Land</button>
    <button style={optionStyle} onClick={()=>setMode("searchByName")}>Search By City</button>
  </section>
}

function App() {
  //Chooses mode
  const [mode, setMode] = React.useState<Mode>("choosing");
  return (
    <>
      <h1 className="f-lg">CityPop</h1>
      {mode !== "choosing" && <BackBtn onClick={()=>setMode("choosing")}></BackBtn>}
      {
        (mode === "searchByName") ? <SearchByName></SearchByName>:
          (mode === "searchByLand")? <SearchByLand></SearchByLand>:
          <ChooseMode setMode={setMode}></ChooseMode>
      }
    </>
  )

}

export default App

