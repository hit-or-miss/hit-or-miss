'use strict';

//Receives a custom err and assigns one if not received.
export default (err, req, res) => {
  console.log('__SERVER ERROR__');
  let error = {
    error: (typeof err === 'object' && err.message) || err,
  };
  res.statusCode = (typeof err === 'object' && err.status) || 500;
  res.statusMessage = (typeof err === 'object' && err.statusMessage) || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};