// Load Express Framework
import express from 'express';

// Load local middleware

import userRouter from './routes/user-route.js';
import auth from './middleware/auth.js';
import notFound from './middleware/404.js';
import error from './middleware/error.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Process incoming through the routers
app.use(userRouter);

//use local middleware
app.use(notFound);
app.use(auth);
app.use(error);

let server;

module.exports = {
  app,
  start: (port) => {
    server = app.listen(port, () => console.log(`HIT-OR-MISS SERVER Listening on PORT: ${port}`));
  },
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  },
};