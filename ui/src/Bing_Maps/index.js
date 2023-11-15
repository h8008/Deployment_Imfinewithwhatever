import { Fragment, useState, useEffect, useMemo } from 'react';
import BingMapsReact from 'bingmaps-react';

const getViewOptions = ({ longitude, latitude }) => ({
  center: {
    longitude,
    latitude,
  },
  mapTypeId: 'road',
});

const getMapOptions = () => ({
  navigationBarMode: 'square',
});

function BingMap(props) {
  // const getCoordinates = useMemo(() => {
  //   console.log('props to bing maps changed');
  //   return props.coordinates;
  // }, [props]);

  const [mapReady, setMapReady] = useState(false);

  // useEffect(() => {
  //   if (mapReady && coordinates) {
  //     setViewOptions(getViewOptions(coordinates));
  //     setMapOptions(getMapOptions());
  //   }
  // }, [coordinates, mapReady]);

  const apiKey = process.env.REACT_APP_BING_MAP_API_KEY;

  return (
    <BingMapsReact
      bingMapsKey={apiKey}
      height='400px'
      width='500px'
      mapOptions={mapReady ? getMapOptions() : null}
      onMapReady={() => {
        setMapReady(true);
      }}
      viewOptions={mapReady ? getViewOptions(props.coordinates) : null}
    />
  );
}

export default BingMap;
