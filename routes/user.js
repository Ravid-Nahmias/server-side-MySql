const sql = require("../db/mysql");

const createUser = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Body is missing!");
    const isInputValidate = await validateInput(req.body);
    if (!isInputValidate)
      return res.sendStatus(400).send("Input is not as requiered!");
    const sqlQuery = `INSERT INTO users (name, email) VALUES ('${req.body.name}', '${req.body.email}');`;
    const result = await sendDataToDB(sqlQuery);
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
const getUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

function validateInput(input) {
  let count = Object.keys(input).length;
  if (count != 2) return false;
  if (input.name) {
    if (!/^[A-Za-z ]+$/.test(input.name)) return false;
  }
  if (input.email) {
    if (
      !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-z]{1,4}$/.test(
        input.email
      )
    )
      return false;
  }
  return true;
}

function sendDataToDB(sqlQuery) {
  return new Promise((resolve, reject) => {
    try {
      sql.query(`${sqlQuery}`, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
