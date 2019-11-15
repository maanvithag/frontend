import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";

const SimpleMap = (props) => {
  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };
  
    Geocode.setApiKey("AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s");
    Geocode.fromAddress("Eiffel Tower").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setCenter(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

    const [center, setCenter] = useState({lat: 39.1653, lng: -86.5264 });
    const [zoom, setZoom] = useState(11);
    const [marker, setMarker] = useState([
        {"doctor": "doctor1", "lat": "39.1853", "lng": "-86.5464" }, 
        {"doctor": "doctor2", "lat": "39.1453", "lng": "-86.5064" }
    ]);
    return (
        <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
        { marker.map((item, index) => (<Marker
            lat={item.lat}
            lng={item.lng}
            name={item.doctor}
            color='blue'
        />))}
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;