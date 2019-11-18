import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export default class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this.props.locations get us a list of locations
      initialList: props.locations,
      coordinates: [],
      center: { lat: 39.1653, lng: -86.5264 },
      zoom: 4,
      summationOfLat: 0,
      summationOfLng: 0,
    };
    this.getMapOptions = this.getMapOptions.bind(this);
  }

  getMapOptions() {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  componentDidMount() {
    this.state.initialList.map(item => {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + item + '&key=AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s', {
        method: 'get'
      }).then(response => response.json())
        .then(data => {
          this.setState({summationOfLat: this.state.summationOfLat + data.results[0].geometry.location.lat})
          this.setState({summationOfLng: this.state.summationOfLng + data.results[0].geometry.location.lng})

          // this.setState({center: {lat: (this.state.summationOfLat)/(this.state.initialList.length), 
          //   lng: (this.state.summationOfLng)/(this.state.initialList.length)}})

          this.state.coordinates.push(data.results[0].geometry.location)
          this.setState({ coordinates: this.state.coordinates })
          //this.setState({center: {lat: latitude/this.state.coordinates.length, lng: longitude/this.state.coordinates.length}})
        })
    })
  }
  //useEffect(() => {handleLoad()},[])

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          options={this.getMapOptions}>
          {this.state.coordinates.map((item, index) => (
            <Marker
              lat={item.lat}
              lng={item.lng}
              name={item.name}
              color='blue' />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}