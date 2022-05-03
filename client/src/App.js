import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Info from "./components/Information/Info";
import PetContainer from "./components/PetContainer/PetContainer";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";


function App() {
  // Holds the results of the first page of petfinder (20 items per page)
  const [result, setResult ] = useState([]);


/**
 * Grabs the results from the first page of petfinder and uploads
 * as first render. Returns mixture of pets(Cats - Dogs - Birds - Rabbits)
 * 
 * https://pet-adopt-project.herokuapp.com
 */
  useEffect(() =>{
     axios.get("/data").then((response) => {
          //setToken(response.data.access_token)  
          console.log(response);
          setResult(response.data);
    }).catch(error => 
      console.log("ERR::   " + error)
      )  
    
}, [])


/**
 * Updates the animal and the zipcode state
 * Returns new search criteria.
 * 
 */
const update = (data) =>{
  let one = data.zipcode;
  let two = data.pet;

  const options = {
    method: "POST",
    url: "/update",
    params: {
      zipcode: one,
      animal: two
    }
  }

  axios.request(options).then((response) =>{
      setResult(response.data);
  }).catch((error) => {
     console.log(error);
  })


}

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Info update={update}  />
      <PetContainer  result={result}  />
      <Footer />
     

    </div>
  );
}

export default App;





