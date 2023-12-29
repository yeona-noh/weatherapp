import React, {useState} from "react";
import axios from "axios";
import WeatherDisplay from "./WeatherDisplay";
const RADAR_API_KEY = "prj_test_pk_bc98832a3852b7f7969e08b3d319fd70e13d2d77";
const WEATHER_API_KEY = "18a3631b896350dd1d53a177819cffbd";
const Search = ({onSearch}) => {
    const [weatherData, setWeatherData] = useState();

    const getCoordinate = async (city) => {
        try {
            let res = await axios.get("https://api.radar.io/v1/geocode/forward",{
                params: { query: city },
                headers: { Authorization: RADAR_API_KEY }

            });
            let lat = res.data.addresses[0].latitude;
            let lon = res.data.addresses[0].longitude;
            return {lat,lon}
        }

        catch (error) {
            console.log(error)
            return error
        }
        
    };

        const getCurrentWeather = async (lat,lon) => {
        try {
            let response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params: { 
                    lat: lat,
                    lon: lon,
                    appid: WEATHER_API_KEY,
                    units: "imperial"
                }
            });

            return response.data.main;
            
        } catch(error) {
            console.log(error)
            return error;
        }
    }

    const [location, setLocation] = useState("");
    const handleSubmit = async (event) => {
        if (location) {
                onSearch(location);
                setLocation('');
              }
        event.preventDefault();
        let {lat,lon} = await getCoordinate(location)
        let main = await getCurrentWeather(lat,lon)
        // console.log(lat)
        // console.log(lon)
        console.log(main)
        setWeatherData(main);

    }
    
    return(
        <div>
        <form onSubmit={handleSubmit}>
        <input type="text" id="lname" name="lname" 
        value={location} onChange={(e) => 
        setLocation(e.target.value)}/>
        <button type="submit">Search</button>
        </form>
        <WeatherDisplay weatherData={weatherData}/>
        </div>
    )
}

export default Search;
