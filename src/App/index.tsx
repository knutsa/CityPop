import React from 'react';
import logo from './logo.svg';
import './App.css';

const fetchGeoNames = async (cityName: string) =>{
  const res = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=100&username=weknowit`);
  const data = await res.json()
  return data.geonames;
}

interface City {
  population: number,
  lat: number,
  lng: number,
  countryName: string,
  name: string
}

const ListItem: React.FC<{city: City}> = ({city}) =>{
  return (
    <article>
      <p>{city.population}</p>
      <p>{city.countryName}</p>
      <p>{city.name}</p>
      <p>This iis a city !!!!!</p>
    </article>
  )
}

const App: React.FC<{}> = ()=> {

  const [res, setRes] = React.useState<City[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [inp, setInp] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInp(e.target.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetchGeoNames(inp)
      .then(data=>{
        setRes(data);
        console.log(data);
      })
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <input type="text" value={inp} onChange={handleChange} />
        <button className="btn" onClick={handleClick}>
          Search
        </button>
        {
          res && res.map((city, index)=>{
            console.log(city);
            return (
              <ListItem key={index} city={city}></ListItem>
            )
          })
        }
      </div>
    );
}

export default App;
