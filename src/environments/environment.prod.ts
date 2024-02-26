import { commonConfig } from './common';

export const servers = {
  apiUrl: 'http://localhost:8080',
};

export const config = {
  production: true,
};

export const environment = { ...config, ...commonConfig(servers) };
