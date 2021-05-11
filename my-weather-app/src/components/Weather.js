import React,{useEffect, useRef, useState} from 'react';
import './styles.css'
import { Button } from 'semantic-ui-react'
import moment from 'moment'
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = styled.div`color : whitesmoke;`

const CardExampleCard = (props)=>{
  const {weatherData} = props
  const [time, setTime] = useState('')
  const interval = useRef()

  

  interval.current = setInterval(()=>{
    setTime(moment().format('h:mm:ss a')) 
    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  },500);

  useEffect(()=>{
    
  },[time])


  const refresh = () => {
    window.location.reload();
  }

  let weatherIcon = null;

  if(weatherData.weather[0].main==='Thunderstrom') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (weatherData.weather[0].main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (weatherData.weather[0].main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (weatherData.weather[0].main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (weatherData.weather[0].main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (weatherData.weather[0].main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }



  return (
    <div>
        <div className='main'>

            <div className="top">
                <p className="header">{weatherData.name}</p>
                <Button className="button" inverted color='green' circular icon='refresh' onClick={refresh} />
           </div>

            <div className='flex'>
                <p className='day'>Day : {moment().format('ddd ll')}</p>
                <WeatherIcon style={{fontSize:30,marginTop:14,paddingLeft :380}}>{weatherIcon}</WeatherIcon>
                <p className='day'>{weatherData.weather[0].main}</p>
            </div>
            <div className='flex'>
                <p className='day' >Time : {time}</p>
                <p className='day'>Nature : {weatherData.weather[0].description}</p>
            </div>
            <div className='flex'>
                <p className='temp'>Temperature : {weatherData.main.temp} &deg;C</p>
                <p className='temp'>Humidity: {weatherData.main.humidity} %</p>
            </div>
            <div className='flex'>
                <p className='sunrise-sunset'>Sunraise : {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className='sunrise-sunset'>Sunset : {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>
    </div>
  </div>
  )

}

export default CardExampleCard;