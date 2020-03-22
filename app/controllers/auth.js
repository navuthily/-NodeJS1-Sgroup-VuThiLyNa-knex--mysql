const knex = require('../../database/connection');
const registerMethod = async (req, res) => {
  await knex('users').insert({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  return res.redirect('/admin/login');
};