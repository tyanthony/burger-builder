import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b61ad.firebaseio.com/'
});

export default instance;