// extra security packages
const helmet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const ratelimiter=require('express-rate-limit')




require('express-async-errors');
const express = require('express');
require('dotenv').config();
const connection=require('./db/connect');
const app = express();
const authrouter=require('./routes/auth');
const jobrouter=require('./routes/jobs');
const authenticateuser=require('./middleware/auth');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/v1/auth',authrouter)
app.use('/api/v1/job',authenticateuser,jobrouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.set('trust proxy',1);
app.use(
  ratelimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, 
  })
);
app.use(xss());
app.use(helmet());
app.use(cors());

const port = process.env.PORT ||3000;

 (async () => {
  try {
      await connection(process.env.Mongo_Uri);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
      );
  } catch (error) {
    console.log(error);
  }
})();


// !security
/**
 * helmet
 * coors
 * xss-clean
 * express-rate limit
 * 
 */


