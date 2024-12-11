import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "todo_app",
//   password: "1234"
// });

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "todo_app",
  password: "1234",
});

// get all records
const getAllRecords = async function () {
  const [allRecords] = await connection.query("SELECT * FROM todo");
  return allRecords;
};

// get one record by id
const getRecordById = async function (id) {
  const [allRecords] = await connection.query("SELECT * FROM todo WHERE id=?", [
    id,
  ]);
  return allRecords;
};

// update a record
const updateRecord = async function (id, header, body) {
  const record = await getRecordById(id);
  if (record.length === 1) {
    await connection.query(
      "UPDATE todo SET header=?, body=?, lastModifiedOn=CURRENT_TIMESTAMP() WHERE id=?",
      [header, body, id]
    );
    const [updatedRecord] = await getRecordById(id);
    return updatedRecord;
  }
  return { message: `No record is found for the id=${id}` };
};

// delete a record by id
const deleteRecord = async function (id) {
  const record = await getRecordById(id);
  if (record.length === 1) {
    await connection.query("DELETE FROM todo WHERE id=?", [id]);
    return { message: `Record is successfully deleted for the id=${id}.` };
  }
  return { message: `No record is found for the id=${id}.` };
};

// create a new record
const createRecord = async function (header, body) {
  try {
    const [{ insertId }] = await connection.query(
      "INSERT INTO todo(header, body) values(?,?)",
      [header, body]
    );
    const [newRecord] = await getRecordById(insertId);
    return newRecord;
  } catch (error) {
    return { message: "Record creation is failed." };
  }
};