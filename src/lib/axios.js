import axios from 'axios';
import appConfigs from 'config';

const server = axios.create({
  baseURL: appConfigs.baseUrl,
  headers: { 'Content-Type': 'application/json' }
});

export default server;
