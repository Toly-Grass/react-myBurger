import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-new-c09e5-default-rtdb.firebaseio.com/'
});

export default instance;
