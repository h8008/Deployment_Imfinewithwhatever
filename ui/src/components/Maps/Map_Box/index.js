import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_API_KEY;

const MapBox = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = Object.values(props.coordinates).reverse();
  const [longitude, setLongitude] = useState(center[0]);
  const [latitude, setLatitude] = useState(center[1]);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: zoom,
    });
  }, [center, latitude, longitude, zoom]);

  useEffect(() => {
    const { longitude, latitude } = props.coordinates;
    map.current.setCenter([longitude, latitude]);
  }, [props.coordinates]);

  useEffect(() => {
    map.current.on("move", () => {
      setLongitude(map.current.getCenter().lng.toFixed(4));
      setLatitude(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div style={props.style}>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapBox;
