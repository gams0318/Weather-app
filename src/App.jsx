import Typewriter from 'typewriter-effect';
import React, { useState } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState({})
  const [value, setValue] = useState('')
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=a55b3bde10a5f37c2689b11ec2fc3975`;

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(URL).then(res => {
      setData(res.data);
      console.log(res.data)
    })
    setValue("")
  }
  return (
    <div className="App">


      <div className="searchBar">

        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} placeholder="Type" value={value} />

        </form>
      </div>
      {data.name === undefined && <div className='type'> <Typewriter
        options={{
          strings: ['Enter a location to know the weather data'],
          autoStart: true,
          loop: true,
        }}
      /></div>}
      <div className="app-data">

        <div className="data">


          <div className="cityName">
            <h2>{data.name}</h2>
            {data.sys ? <span>{data.sys.country}</span> : null}
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="image">
            {data.weather &&
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="100px" />}
          </div>
          <div className="info">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>{
          data.name !== undefined &&

          <div className="sun">
            <div>
              <p>Sunrise 🌅</p>
              {data.sys ? <p className='bold'>{new Date(data.sys.sunrise * 1000).toLocaleString()}</p> : null}
            </div>
            <div>
              <p>Sunset 🌇</p>
              {data.sys ? <p className='bold'>{new Date(data.sys.sunset * 1000).toLocaleString()}</p> : null}
            </div>
          </div>}
        {data.name !== undefined && (
          <div className="footer">
            <div>
              <p>
                Feels like
              </p>
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
            </div>
            <div>
              <p >Humidity</p>

              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div>
              <p>Wind</p>
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}kmph</p> : null}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

export default App;
