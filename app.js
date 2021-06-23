require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors = require('cors')


mongoose
  .connect(`mongodb+srv://wellness:wellness@cluster0.w5f76.mongodb.net/wellness-test?retryWrites=true&w=majority`, 
  { useCreateIndex: true,  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//  CORS PERMISSIONS
app.use(
  cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: [`http://localhost:3000`],
  })
)

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      


app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));
app.use('/electric', require('./routes/electric.routes'))

app.use((req, res, next)=>{
  res.sendFile(__dirname+'/public/index.html')
})

app.listen(5000, () => {
  console.log(`Listening on port 5000`);
});

module.exports = app;
