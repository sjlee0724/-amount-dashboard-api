import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123qwe!',
  port: 3306,
  database: 'savemoney',
  connectionLimit: 5,
});

export { pool };
