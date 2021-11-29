import * as compression from 'compression';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { SERVER_PORT, SERVER_HOST } from './env';
import * as cors from 'cors'
import router from './router'
import logger from './logger'
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { testDBConnection } from './middlewares/test-db-connection';

const app = express();

app.use(compression());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride());
app.use(cors())

app.use('/api', testDBConnection, router)

app.all('*', (req, res, next) => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
    logger.log('info', `Server Port: ${SERVER_PORT}`);
    logger.log('info', `Server URL: http://${SERVER_HOST}:${SERVER_PORT}`);
});

// for testing
export default app