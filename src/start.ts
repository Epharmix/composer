import AppServer from './app';

// TODO: pick a port that does not conflict with existing projects
const port = 8008;
const server = new AppServer(port);
server.start();
