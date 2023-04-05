const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  enabled: process.env.NODE_ENV === 'production',
};

export default rollbarConfig;
