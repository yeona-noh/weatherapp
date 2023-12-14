import React, {useState} from "react";
import axios from "axios";
const RADAR_API_KEY = "prj_test_pk_bc98832a3852b7f7969e08b3d319fd70e13d2d77"
 
const Search = ({onSearch}) => {
    
    const getCoordinate = async (city) => {
        try {
            let res = await axios.get("https://api.radar.io/v1/geocode/forward",{
                params: { query: city },
                headers: { Authorization: RADAR_API_KEY }
            });
            return res
        }
        catch (error) {
            console.log(error)
            return error
        }
        
    };
        const [location, setLocation] = useState("");
      
        const handleSubmit = (event) => {
            if (location) {
                onSearch(location);
                setLocation('');
              }
          event.preventDefault();
          let res = getCoordinate(location)
          console.log(res)
        }
      
    return(
        <form onSubmit={handleSubmit}>
        <input type="text" id="lname" name="lname" value={location} onChange={(e) => setLocation(e.target.value)}/>
        <button type="submit">Search</button>
        </form>
    )
}

export default Search;