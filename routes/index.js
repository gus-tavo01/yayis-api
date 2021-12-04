const { Router } = require('express');
require('express-async-errors'); // temporal until express v5 is released

const listsRouter = require('./lists/router');
const usersRouter = require('./users/router');
const themesRouter = require('./themes/router');

const router = Router();
const api = '/api/v1';

// middlewares
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const customResponse = require('../middlewares/customResponse');
const requireAuth = require('../middlewares/requireAuth');

router.use(customResponse);

// app routes
router.use(`${api}/lists`, requireAuth, listsRouter);
router.use(`${api}/users`, usersRouter);
router.use(`${api}/themes`, themesRouter);

router.use(errorHandlerMiddleware);

module.exports = router;
