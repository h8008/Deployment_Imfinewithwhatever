import { useContext } from 'react';
import BingMapsReact from 'bingmaps-react';
import { RestaurantsContext } from '../providers/RestaurantsProvider';

function BingMap(props) {
  const { coordinates } = props;
  const apiKey = process.env.REACT_APP_BING_MAP_API_KEY;
  const longitude = coordinates == null ? 0 : coordinates.longitude;
  const latitude = coordinates == null ? 0 : coordinates.latitude;
  return (
    <BingMapsReact
      bingMapsKey={apiKey}
      height='400px'
      width='500px'
      mapOptions={{
        navigationBarMode: 'square',
      }}
      viewOptions={{
        center: {
          longitude,
          latitude,
        },
        mapTypeId: 'grayscale',
      }}
    />
  );
}

export default BingMap;
