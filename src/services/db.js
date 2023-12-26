
import {Sequelize} from 'sequelize';
import {resolve} from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.EXPRESS_SQLZ_DB || (resolve('../../database.db')),
});
