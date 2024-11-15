import io from 'socket.io-client';
import store from './redux/store';
import { addMessage } from './redux/chatSlice';

const socket = io('http://localhost:3000');

socket.on('message', (message) => {
  store.dispatch(addMessage(message));
});

export const sendMessage = (message) => {
  socket.emit('message', message);
};

export default socket;

