const mysql = require('mysql');
const config = require('../config');

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbConf);

  connection.connect((err) => {
    if (err) {
      console.log('[db err]', err);
      setTimeout(handleCon, 3000);
    } else {
      console.log('DB Connected!');
    }
  });

  connection.on('error', (err) => {
    console.log('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function get(table, name_id, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE ${name_id} = ${id}`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function update(table, name_id, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE ${name_id} = ?`,
      [data, data[name_id]],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function upsert(table, name_id, data) {
  if (data && data[name_id]) {
    return update(table, name_id, data);
  } else {
    return insert(table, data);
  }
}

function remove(table, name_id, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM ${table} WHERE ${name_id} = ${id}`,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function query(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  list,
  get,
  insert,
  update,
  upsert,
  remove,
  query,
};
