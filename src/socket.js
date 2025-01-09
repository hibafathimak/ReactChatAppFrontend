import io from 'socket.io-client';
import store from './redux/store';
import { addMessage } from './redux/chatSlice';

const socket = io('https://reactchatapp-ofee.onrender.com/');

socket.on('message', (message) => {
  store.dispatch(addMessage(message));
});

export const sendMessage = (message) => {
  socket.emit('message', message);
};

export default socket;

