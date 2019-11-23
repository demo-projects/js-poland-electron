import 'sqlite3';
import path from 'path';
import { remote } from 'electron';
import knex from 'knex';

const { app } = remote;

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(app.getPath('userData'), 'snippets.sqlite')
  },
  useNullAsDefault: true
});

db.schema.hasTable('snippets')
  .then(exist => {
    if(!exist) {
      return db.schema.createTable('snippets', (table) => {
         table.increments('id').primary();
         table.text('content');
      })
    }
  });

export default db;