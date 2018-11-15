'use strict';

// Custom 400 Handler because we always want to return a JSON response
export default (req, res) => {
  let error = { error: 'Bad Request' };
  res.statusCode = 400;
  res.statusMessage = 'Input proper direction indicator';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};