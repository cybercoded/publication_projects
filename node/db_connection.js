// db_connection.js
import mysql from 'mysql2/promise';

export default async function getDataFromDB(id = 1) {

  // Create a connection to the MySQL database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fillable_pdf_form',
    password: ''
  });

  // Fetch data from the database
  try {
    const [rows] = await connection.execute('SELECT * FROM reports WHERE id = ' + id);
    return rows[0];
  } finally {
    await connection.end(); // 👈 Closes the connection
  }
}
