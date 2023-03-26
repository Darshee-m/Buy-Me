const db = require('../config/db');

const User = {
    selectAll: cb => {
      const queryString =
      'SELECT user.email_id, user.password, user.name, user.user_name, user.phone_number, user.address FROM bm_auction_system.user;'
      db.query(queryString, (err, results) => {
        if (err) throw err
        cb(results)
      })
    },
    selectOneById: (id, cb) => {
      const queryString =
      'SELECT user.email_id, user.password, user.name, user.user_name, user.phone_number, user.address FROM bm_auction_system.user WHERE email_id=?;'
      db.execute(queryString, [id], (err, results, fields) => {
        if (err) throw err
        cb(results)
      })
    },
    selectOneByUsername: (username, cb) => {
      const queryString =
        'SELECT user.email_id, user.password, user.name, user.user_name, user.phone_number, user.address FROM bm_auction_system.user WHERE user_name=?;'
      db.execute(queryString, [username], (err, results, fields) => {
        if (err) throw err
        cb(results)
      })
    },
    deleteOne: (id, cb) => {
      const queryString = 'DELETE FROM users WHERE email_id=?;'
      db.execute(queryString, [id], (err, result) => {
        if (err) throw err
        cb(result)
      })
    },
    insertOne: (vals, cb) => {
      const queryString =
        'INSERT INTO `bm_auction_system`.`user`(`email_id`, `password`, `name`, `user_name`, `phone_number`,`address`) VALUES (?,?,?,?,?,?);'
      db.execute(queryString, vals, (err, result) => {
        if (err) throw err
        cb(result)
      })
    },
    updateOne: (vals, id, cb) => {
      vals.push(id)
      const queryString =
        'UPDATE users SET user_name=?, password=? WHERE email_id=?;'
      db.execute(queryString, vals, (err, result) => {
        if (err) throw err
        cb(result)
      })
    }
  }

module.exports = User
