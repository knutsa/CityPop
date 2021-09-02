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
  return <section className="mt-5 container">
    <div className="row g-5 g-md-0 d-flex justify-content-center">
      <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-end mx-md-1">
        <button style={optionStyle} onClick={()=>setMode("searchByLand")}>Search By Country</button>
      </div>
      <div className="col-md-4 d-flex align-items-center justify-content-center justify-content-md-start mx-md-1">
        <button style={optionStyle} onClick={()=>setMode("searchByName")}>Search By City</button>
      </div>
    </div>
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

