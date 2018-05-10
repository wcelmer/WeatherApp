import React from 'react';


const API_KEY = 'edaaa962046794ad79c665b90f07507e';

class Titles extends React.Component {
  render(){
    return (
      <div className='title d-flex justify-content-center row p-1'>
    		<h1 className='display-4 col-12'>Weather Finder</h1>
    		<h3 className='col-12'>Check the weather wherever you want !</h3>
        {
        this.props.weather_id &&
          <div id='image' className={ `img${this.props.weather_id}` }></div>
        }
    	</div>
    )
  }
}
class Form extends React.Component {
  render(){
    return (
      <form onSubmit={this.props.getWeather}>
        <div className='row d-flex justify-content-center'>
          <input className='m-2 col-6 col-sm-12 col-xs-12' type='text' name='city' placeholder='City (Poznań)'></input>
          <input className='m-2 col-6 col-sm-12 col-xs-12' type='text' name='country' placeholder='Country (PL)'></input>
        </div>
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
    this.props.city && this.props.country &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Location:
  	 	  <span className=""> { this.props.city }, { this.props.country }</span>
  	  </p>
    </div>
	 }
	 {
	 	this.props.temperature &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Temperature:
	 		  <span className=""> { this.props.temperature } &#176;C	</span>
	 	  </p>
    </div>
	 }
	 {
	 	this.props.humidity &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Humidity:
  	 		<span className=""> { this.props.humidity }% </span>
  	 	</p>
    </div>
	 }
   {
	 	this.props.pressure &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Pressure:
  	 		<span className=""> { this.props.pressure } hPa </span>
  	 	</p>
    </div>
	 }
   {
	 	this.props.wind &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Wind speed:
	 		  <span className=""> { this.props.wind } m/s </span>
	 	  </p>
    </div>
	 }
	 {
	 	this.props.description &&
    <div className='alert alert-info mt-1 p-1'>
      <p className=""> Conditions:
	 		  <span className=""> { this.props.description } </span>
	    </p>
    </div>
	 }
	 {
	 	this.props.error && <p className="alert alert-danger">{ this.props.error }</p>
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
    weather_id: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (api_call.ok === true) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        description: data.weather[0].description,
        weather_id: data.weather[0].id.toString().charAt(0),
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
        weather_id: undefined,
        error: "Please enter the correct values."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container p-4">
              <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12 text-center">
                  <Titles weather_id={this.state.weather_id}/>
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12 text-center">
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
