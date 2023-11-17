/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
import { useState, useEffect, useRef } from "react";
import TextField from "../../../ui_components/TextField";

<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAB4500FLL_D-pYPeSii7k8Q9QMzUmLeEE&libraries=places&callback=initMap"
></script>;

export const LocationAutocomplete = ({ handleLocationChange }) => {
  const inputRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      const options = {
        types: ["geocode"],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, options);
      setAutocomplete(autocomplete);
    }
  }, []);

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    handleLocationChange(place.formatted_address);
  };

  return (
    <TextField
      fullWidth
      color="primary"
      focused
      inputRef={inputRef}
      onChange={() => {}}
      placeholder="Enter your location"
      onBlur={handlePlaceChanged}
    />
  );
};

export default LocationAutocomplete;
