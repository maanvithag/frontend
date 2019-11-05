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
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    const [location, setLocation] = useState([
        {"doctor": "doctor1", "lat": "11.0168", "lng": "76.9558" }, 
        {"doctor": "doctor2", "lat": "11.0200", "lng": "77.000" }
    ]);
    const [passedInfo, setPassedInfo] = useState(props.passedInfo);
    console.log(center.lat, center.lng);
    console.log(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));

    {/*
    Geocode.fromAddress("Bloomington").then(
      response => {
        const { latR, lngR } = response.results[0].geometry.location;
        setCenter({lat: latR, lng: lngR})
        console.log(latR, lngR);
      },
      error => {
        console.error(error);
      }
    );
    */}

    return (
        <div style={{ height: '80vh', width: '100%' }}>
        {passedInfo}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
        { location.map((item, index) => (<Marker
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