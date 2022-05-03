const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');
const { response } = require('express');
const req = require('express/lib/request');
require('dotenv').config();

const userId = process.env.USER_API;
const userKey = process.env.USER_SECRET;

app.use(cors({
    origin: "*"
}))

const fetchData = async () =>{
    const param = new URLSearchParams();
    param.append("grant_type", "client_credentials");
    param.append("client_id", userId);
    param.append("client_secret", userKey);

        const petFinderRes = await fetch("https://api.petfinder.com/v2/oauth2/token", 
        {
        method: "POST",
        body: param
        });
  
    const data = await petFinderRes.json();
    return data;    
}



const getAnimals = async () =>{
    const info = await fetchData();
    try{
        const petResultData = await fetch("https://api.petfinder.com/v2/animals", {
        headers: {
            Authorization: `Bearer ${info.access_token}`,
            },
            
        })
        const jsonResult = await petResultData.json();
        //console.log(jsonResult);
        return jsonResult.animals;
    }catch(err){
        console.log("This is the erro" + err);
    }

};




app.post("/update", async (req, res) => {
   let zipcode = req.query.zipcode;
   let animal = req.query.animal;

    const updateInfo = await fetchData();

    const petResultUpdate = await fetch(`https://api.petfinder.com/v2/animals?location=${zipcode}&type=${animal}`, {
      headers: {
        Authorization: `Bearer ${updateInfo.access_token}`,
        },
      
      })
      const jsonUpdate = await petResultUpdate.json();
      console.log(jsonUpdate)
      res.json(jsonUpdate.animals); 
})



app.get("/data", async (req, res) =>{
    const info = await getAnimals();
    //console.log(info);
    res.json(info);
})



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})