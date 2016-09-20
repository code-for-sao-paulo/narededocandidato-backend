import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import Settings from '../settings';
import logger from '../../components/logger';
import routes from './api/routes';
import ressendrHandlers from '../../components/ressendr-handlers';
import startDatabase from '../database/database';

class WebApp {
  constructor(app) {
    this.app = app;
    this.useCors();
    this.parseBody();
    this.morgan();
    this.database();
    this.fetchRoutes();
    this.init();
  }

  parseBody() {
    this.app.use(bodyParser.json());
  }

  morgan() {
    this.app.use(morgan('tiny', { stream: { write: logger.info } }));
  }

  useCors() {
    this.app.use(cors());
  }

  fetchRoutes() {
    ressendrHandlers();
    return routes(this.app);
  }

  database() {
    startDatabase();
  }

  init() {
    return this.app.listen(Settings.web.httpPort, this.banner);
  }

  banner() {
    logger.info(`Server UP and Running in port: ${Settings.web.httpPort}`);
  }
}

export default new WebApp(express());
