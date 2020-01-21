import axios from 'axios';

const instances = axios.create ( {
    baseURL: "https://jsonplaceholder.typicode.com"
});

instances.defaults.headers.common['Authorization'] = 'AUTH-TOKEN';

export default instances;