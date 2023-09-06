// Import the axios library
//Please be sure to have installed axios on your machine using the terminal command: npm install axios within your working directory for this project
//Npm install should now work (will automatically install axios for you) since Cody has updated the package.json file with the correct axios dependencies
//To test this file locally on your machine you can navigate to where this file is located on your machine and run the terminal command: node APIConnectionToYelp.js
const axios = require('axios');

// Set the API endpoint and parameters
const endpoint = 'https://api.yelp.com/v3/businesses/search';
const params = {
    term: 'restaurant',
    location: 'San Francisco'
};

const ourYelpAPIkey = 'NVmjyJalt90IqHdTpPuf1KSKojFftGgaTePS9eEOMh6Ku-UroR_ayzLiezh3JaiWGRBmgK19Pzavd4O0QhRlJ8OP2ai4uu9Bbq3cVigoPBqeWnrUudkfHQ103HkrZHYx'

// Set the API headers with your Yelp API key
const headers = {
    Authorization: `Bearer ${ourYelpAPIkey}`
};

// Send the API request to Yelp for their data
axios.get(endpoint, { params, headers })
    .then(response => {
        // Handle the API response
        console.log(response.data);
    })
    .catch(error => {
        // Handle API errors
        console.error(error);
    });