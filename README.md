Hello, CS 361!

We are CalorieCurious. Our application is designed to provide you with the nutritional information you need to make informed decisions about your diet. It's designed to be user-friendly and easy to navigate--simply enter the food you are curious about and we will provide you with the nutrition information you need.

## Communication Contract

# How to programmatically REQUEST data?

To request weather data from the microservice, you need to make a
GET request to the /weather/:zipcode endpoint in the server.js file, where :zipcode is the ZIP code for which you want to fetch the weather data.

To do this, please input the zip code in the following input element in the App.tsx file by navigating to:     
     
cd 361-alex-micro    
cd cc-client   
npm start    

Example Request sent to server:   
GET http://localhost:3100/weather/94107    
   
The data is sent to the endpoint   
app.get('/weather/:zipcode', async (req, res) => {   
    try {   
      const { zipcode } = req.params;   
      console.log(zipcode)   
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=$   {zipcode},us&appid=0d4ed5ab2ec3c370df2be128922940b9`);   
      const data = await response.json();   
      const temperature = data.main.temp   
      const name = data.name   
      const description = data.weather[0].description   
      res.json({temperature, name, description})   
    } catch (error) {   
      console.error('Error fetching weather data:', error);   
      res.status(500).json({ error: 'Failed to fetch weather data' });   
    }  
  });  
    
# How to programmatically RECEIVE data?

The data is sent to the endpoint:
Send a json request back to the frontend using res.json(),
containing the weather data for the specified ZIP code.

The response will include these fields:   
temperature: The temperature in Kelvin.    
description: A brief description of the weather conditions.   
name: The name of the city for which the weather data is fetched.   
   
app.get('/weather/:zipcode', async (req, res) => {   
    try {   
      const { zipcode } = req.params;   
      console.log(zipcode)
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=$  {zipcode},us&appid=0d4ed5ab2ec3c370df2be128922940b9`);  
      const data = await response.json();  
      const temperature = data.main.temp   
      const name = data.name   
      const description = data.weather[0].description   
      // JSON to receive data   
      res.json({temperature, name, description})  
    } catch (error) {  
      console.error('Error fetching weather data:', error);  
      res.status(500).json({ error: 'Failed to fetch weather data' });   
    }  
  });  

Example Response:  
  
{  
  "temperature": 291.68,  
  "description": "clear sky",  
  "name": "San Francisco"  
}   



# UML Sequence Diagram
```
  +-------------+                        +-------------+    
  |   Client    |                        |   Server    |    
  +-------------+                        +-------------+    
       |                                        |   
       |  Request (1): GET /weather/:zipcode    |   
       +--------------------------------------->|   
       |                                        |   
       |                                        |   
       |  Response (2): JSON weather data       |   
       |<---------------------------------------+   
       |                                        |   

```
   
(1) The frontend will send a get request to the following api 
code listed above with the zip code

(2) The backend will get the temperature, name of city, and basic description of the api request if valid and return the fields back
up to the frontend
