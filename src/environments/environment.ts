import { commonConfig } from './common';

export const servers = {
  apiUrl: 'http://localhost:8080',
};

export const config = {
  production: false,
};

export const environment = { ...config, ...commonConfig(servers) };
