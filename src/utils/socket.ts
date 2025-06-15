import { io } from "socket.io-client";

const socket = io("http://localhost:7979");

export default socket;
