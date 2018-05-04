/**
 * Module dependencies.
 */
const express = require('express');
const http = require('http');
const io = require('socket.io');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');

/**
  Routes for application
 */
const routes = require('./routes');

/**
  workers for prices updates
*/
const jobs = require('./jobs');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
*/

dotenv.load({ path: '.env' });

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();
const server = http.createServer(app);
const socketIO = io(server);

/**
 * Connect to MongoDB.
 */

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('jwt_secret', process.env.JWT_SECRET)



/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
const port = process.env.PORT || 3001;
app.set('port', port);
app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client', 'build')));


routes(app);


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(port, () => {
  jobs.start();
  console.log('%s App is running at http://%s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});


module.exports = app;
