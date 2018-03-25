import axios from 'axios';
export function fetchTableDataAPI() {
    return axios.get('http://jsonplaceholder.typicode.com/posts').
    then(response => response);
}
