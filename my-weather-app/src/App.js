import React,{useState, useEffect} from 'react'
import Weather from './components/Weather'
import './App.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
function App() {

  const [lat, setLat] = useState([])
  const [long, setLong] = useState([])
  const [data, setData] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position)
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response=>response.json())
      .then(result=>{
        setData(result)
        console.log(result)
      }) ;
    }
    fetchData()
  },[lat, long])


  return (
    <div className="App">
      {
        (typeof data.main !='undefined') ? 
        (<Weather weatherData={data}/>) : 
        (<div>
          <Dimmer active>
              <Loader>Weathering ...</Loader>
          </Dimmer>
        </div>)
      }
    </div>
  );
}

export default App;
