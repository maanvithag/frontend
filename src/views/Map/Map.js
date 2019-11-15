import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";

const SimpleMap = (props) => {
  // const [marker, setMarker] = useState([]);
  const initialList = props.props;
  const [addressList, setAdressList] = useState(initialList);
  const [coordinates, setCoordinates] = useState({});

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  Geocode.fromAddress("Eiffel Tower").then(
    response => {
      // var name = addressObject.name;
      const { lat, lng } = response.results[0].geometry.location;
      // setMarker(marker.concat({name: name, lat: lat, lng: lng}));
      // setCoordinates({lat: lat, lng: lng});
      setCenter(lat, lng);
    },
    error => {
      console.error(error);
    }
  );

  // const handleAddress = (addressObject) => {
  //   Geocode.fromAddress(addressObject.address).then(
  //     response => {
  //       // var name = addressObject.name;
  //       var { lat, lng } = response.results[0].geometry.location;
  //       // setMarker(marker.concat({name: name, lat: lat, lng: lng}));
  //       setCoordinates({lat: lat, lng: lng});
  //       console.log(addressObject.address);
  //     },
  //     error => {
  //       console.error(error);
  //     }
  //   );
  // }

  Geocode.setApiKey("AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s");

  // for(var i = 0; i < initialList.length; i++) {
  //   handleAddress(initialList[i.toString()]);
  // }

  const [center, setCenter] = useState({lat: 39.1653, lng: -86.5264 });
  const [zoom, setZoom] = useState(11);
  const [marker, setMarker] = useState([
    {"doctor": "doctor1", "lat": "39.1853", "lng": "-86.5464" }, 
    {"doctor": "doctor2", "lat": "39.1453", "lng": "-86.5064" }
  ]);
  // console.log(coordinates);

  return (
      <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyB8gxX2h4_2Xw1sKg-jDdv8T_uut8-KV8s' }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}>
      { marker.map((item, index) => (
        <Marker
          // lat={coordinates.lat}
          lat={item.lat}
          lng={item.lng}
          // lng = {coordinates.lng}
          name={item.name}
          color='blue'/>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;