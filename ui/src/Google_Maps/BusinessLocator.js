import { useCallback, useState, memo, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Grid, styled } from "@mui/material";
import { LOCATIONMASKMESSAGE } from "../constants/Constants";

const containerStyle = {
  width: "750px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = styled(Grid)(() => ({
  GridRow: true,
}));

function BusinessLocator(props) {
  const { address } = props;

  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `AIzaSyAtsRKyeEZEf4qYL0DIn9jfVTBB42QQXBw`,
  });

  const geocode = useCallback(
    (request) => {
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
          console.log(JSON.stringify(result, null, 2));
          console.log(results);
          return results;
        })
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
    },
    [geocoder, map, marker]
  );

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    const geocoder = new window.google.maps.Geocoder();
    const marker = new window.google.maps.Marker();

    map.fitBounds(bounds);

    setMap(map);
    setGeocoder(geocoder);
    setMarker(marker);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (geocoder && props.address !== LOCATIONMASKMESSAGE) {
      geocode({ address: address });
    }
  }, [geocode, geocoder, address, props.address]);

  return (
    <MapComponent>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          // onResize={onResize}
          // onZoomChanged={handleZoom}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </MapComponent>
  );
}

export default memo(BusinessLocator);
