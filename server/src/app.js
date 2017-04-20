import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

export const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  next();
})
routes(app);

app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port 3001');
});