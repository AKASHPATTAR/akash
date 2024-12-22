const axios = require('axios');


const RAPIDAPI_KEY = '87b9077913msh90a46517c90b478p103450jsn3eb38ac44736';
const RAPIDAPI_HOST = 'rapidapi.com';

const fetchOnlinePrice = async (endpoint, params) => {
    try {
        const options = {
            method: 'GET',
            url: `https://${RAPIDAPI_HOST}/${endpoint}`,
            params: params,
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        };

        const response = await axios.request(options);
        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};


const endpoint = 'some-endpoint';
const params = {
    key1: 'value1',
    key2: 'value2',
};
fetchOnlinePrice(endpoint, params);
