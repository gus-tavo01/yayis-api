const { Router } = require('express');
require('express-async-errors');
const listsRouter = require('./lists/router');

const router = Router();
const api = '/api/v1';

// middlewares
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const customResponse = require('../middlewares/customResponse');

router.use(customResponse);

// app routes
router.use(`${api}/lists`, listsRouter);
// router.use(`${api}/users`, usersRouter);
// router.use(`${api}/themes`, themesRouter);

router.use(errorHandlerMiddleware);

module.exports = router;
