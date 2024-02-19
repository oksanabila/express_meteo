# Weather API (express_meteo)

## **Description**

**Weather API** - is a simple RESTful API designed to provide weather information by city or coordinates. The API uses [OpenWeatherMap API](https://openweathermap.org/api) to get weather data and provides a convenient interface to receive it.

## **Getting started**

To get started with this project you need to clone the repository and install dependencies.

### **Preconditions**

- Node.js version 12.x or higher
- npm
- Valid API key for OpenWeatherMap API

### **Setup**

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-api.git
   cd weather-api
   ```
2. Set dependencies:
   ```
   npm install
   ```
3. Run the project:
    ```
   npm run start
    ```

  
## Testing the API

After starting the project locally, you can test the API functionality using the following links:

- **Search by city:** [http://localhost:5000/weather?city=lviv](http://localhost:5000/weather?city=lviv)
- **Search by coordinates:** [http://localhost:5000/weather?lat=18.839161336525855&lon=42.29218241092334](http://localhost:5000/weather?lat=18.839161336525855&lon=42.29218241092334)

These links are intended for local testing and demonstration purposes.

## Documentation

The API documentation is available at [http://localhost:5000/docs/](http://localhost:5000/docs/). The documentation provides detailed information about the available endpoints, parameters, and expected responses. 

Please note that the documentation link will work after the project has been started locally.

