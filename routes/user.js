const sql = require("../db/mysql");
//==========================================CRUD=========================================================
//==================================CREATE USER==========================================================
const createUser = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Body is missing!");
    const isInputValidate = await validateInput(req.body);
    if (!isInputValidate)
      return res.sendStatus(400).send("Input is not as requiered!");
    const sqlQuery = `INSERT INTO users (name, email) VALUES ('${req.body.name}', '${req.body.email}');`;
    await sendDataToDB(sqlQuery);
    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
//====================================GET USERS==========================================================
const getUser = async (req, res) => {
  try {
    const sqlQuery = `SELECT * from users`;
    const result = await sendDataToDB(sqlQuery);
    return res.send(result);
  } catch (error) {
    return res.status(400).end();
  }
};

//====================================UPDATE USER========================================================
const updateUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("ID is missing!");
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      // check that all the params we want to update, can be changed
      return res.status(400).send({ error: "Invalid updates!" });
    }
    if (req.body.name) {
      // update the name
      const sqlQuery = `UPDATE users SET name = '${req.body.name}' WHERE id= ${req.params.id};`;
      await sendDataToDB(sqlQuery);
    }
    if (req.body.email) {
      // update the email
      sqlQuery = `UPDATE users SET email= '${req.body.email}' WHERE id= ${req.params.id};`;
      await sendDataToDB(sqlQuery);
    }

    return res.status(200).end();
  } catch (error) {
    return res.status(400).send(error);
  }
};

//====================================DELETE USER=========================================================

const deleteUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).send("ID is missing!");
    const sqlQuery = `DELETE FROM users WHERE id= '${req.params.id}'`;
    await sendDataToDB(sqlQuery);
    return res.status(200).end();
  } catch (error) {
    return res.status(400).end();
  }
};

//====================================VALIDATE FUNC=======================================================

function validateInput(input) {
  let count = Object.keys(input).length;
  if (count !== 2) return false;
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

//====================================SEND TO DATABASE=====================================================

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
