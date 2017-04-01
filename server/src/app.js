import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import EventController from './controllers/event';
import * as events from './models/Event';
import * as users from './models/User';

// const router = express.Router();

export const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
})
routes(app);

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001');
});