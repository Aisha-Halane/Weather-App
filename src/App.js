import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import weather from './images/weather.jpg';
import night from './images/night.webp';
import day from './images/day.jpg';
import { useEffect, useState } from 'react';


function App() {
  const[inputText,setInputText]=useState('')
  const [dat,setData]=useState([])
  const[isNull, setIsNull]=useState(true)
  const [city,setCity]=useState()
  const [name,setName]=useState('')
  const apiKey = 'ivByqRUdCbuobBb31EfzVLW3FUs98XC5';
  const getCityName = async(city)=>{
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`);
    const data = await response.json();
    return data
  }
  const mycity = ()=>{
    getCityName(inputText.trim().toLowerCase()).then(data=>{
      if(inputText.length===0){
        setIsNull(true)
      }
      else{
        setIsNull(false)
      }
      setData(data)
    })
  }
  const update=(e)=>{
    const item = e.target.id
    const name = e.target.innerHTML
    setName(name)
    getCityCode(item).then(data=>setCity(data))
    setData([])
    setIsNull(true)
  }
  const getCityCode=async(code)=>{
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${code}?apikey=${apiKey}`);
    const data = await response.json();
    return data
  }
  useEffect(()=>{
    mycity()
  },[inputText])
  return (
    <div className='container my-5'>
      <h1 className='text-center m-3 header'>Weather App</h1>
      <div className='card shadow-lg rounded m-auto'>
        <div className='card-body text-center'>
        {city!==undefined? city.map(item=>item.IsDayTime?<img src={day} alt='day'/>:<img src={night} alt='night'/>):<img src={weather} alt='weather'/>}
        </div>
        <form action=''>
          <div className='form-group'>
            <input type = 'text' className='form-group' name='searchCity' id='searchCity' placeholder='Enter your location' autoComplete='off' onChange={(e)=>{setInputText(e.target.value)}}/>
          </div>
        </form>
        {!isNull&& <div className='card card-body m-2 list-card'>
          <div className='list'onClick={(e)=>{
            update(e)
          }}>
            {dat.map(item=><div><h5 id={item.Key} className='target-class'>{item.LocalizedName}</h5><hr/></div>)}
          </div>
        </div>}
        <h1 className='text-center' id='cityName'>{name}</h1>
        {city!==undefined ?city.map(item=><div><h3 className='text-center' id='weather'>{item.WeatherText}</h3>
        <h3 className='text-center' id='degree'>{Math.round(item.Temperature.Metric.Value)} &deg;C</h3>
        <h6 className='text-center mb-5'>{item.IsDayTime?"Day":"Night"}</h6>
        </div>):<div><h3 className='text-center' id='weather'>Weather</h3>
        <h3 className='text-center' id='degree'>35 &deg;C</h3>
        <h6 className='text-center mb-5'>Day</h6>
        </div>}
      </div>
    </div>
  );
}

export default App;
