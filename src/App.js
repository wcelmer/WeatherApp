import React from 'react';


const API_KEY = 'edaaa962046794ad79c665b90f07507e';

class Titles extends React.Component {
  render(){
    return (
      <div>
    		<h1>Weather Finder</h1>
    		<h3>Check the weather wherever you want !</h3>
    	</div>
    )
  }
}
class Form extends React.Component {
  render(){
    return (
      <form className='input-group input-group-lg' onSubmit={this.props.getWeather}>
        <input type='text' name='city' placeholder='City'></input>
        <input type='text' name='country' placeholder='Country'></input>
        <button className='btn btn-info m-4' type='submit'>Get Weather</button>
      </form>
    )
  }
}
class Weather extends React.Component {
  render(){
    return (
      <div className="weather__info">
	 {
	 	this.props.city && this.props.country && <p className="weather__key"> Location:
	 		<span className="alert-success"> { this.props.city }, { this.props.country }</span>
	 	</p>
	 }
	 {
	 	this.props.temperature && <p className="weather__key"> Temperature:
	 		<span className="weather__value"> { this.props.temperature } &#176;C	</span>
	 	</p>
	 }
	 {
	 	this.props.humidity && <p className="weather__key"> Humidity:
	 		<span className="weather__value"> { this.props.humidity }% </span>
	 	</p>
	 }
   {
	 	this.props.pressure && <p className="weather__key"> Pressure:
	 		<span className="weather__value"> { this.props.pressure } hPa </span>
	 	</p>
	 }
   {
	 	this.props.wind && <p className="weather__key"> Wind speed:
	 		<span className="weather__value"> { this.props.wind } m/s </span>
	 	</p>
	 }
	 {
	 	this.props.description && <p className="weather__key"> Conditions:
	 		<span className="weather__value"> { this.props.description } </span>
	 </p>
	 }
	 {
	 	this.props.error && <p className="weather__error">{ this.props.error }</p>
	 }
	</div>
    )
  }
}

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    pressure: undefined,
    wind: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        pressure: undefined,
        wind: undefined,
        description: undefined,
        error: "Please enter the correct values."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                  <Titles />
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    pressure={this.state.pressure}
                    wind={this.state.wind}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
