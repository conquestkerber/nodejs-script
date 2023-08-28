const mysql = require("mysql2/promise");

const jsonData =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/json/trainingIntensity.json";

async function createTableFromJson(jsonData, connectionConfig) {
  try {
    const connection = await mysql.createConnection(connectionConfig);

    // Create the table
    await connection.execute(jsonData.createTable);

    // Insert data into the table
    for (const insertInstruction of jsonData.insertData) {
      await connection.execute(insertInstruction);
    }

    connection.end();
    console.log("Table created and data inserted successfully!");
  } catch (err) {
    console.error("Error creating table and inserting data:", err);
  }
}

// Example usage:
const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "admin",
  database: "running-db",
};

createTableFromJson(jsonData, connectionConfig);

/* const fs = require("fs");
const mysql = require("mysql");

// Replace these with your actual database connection details
const db_config = {
  host: "localhost",
  user: "root",
  password: "admin",
  database: "running-db",
};

// Read JSON data from the file (replace 'data.json' with your file name)
const rawData = fs.readFileSync("trainingIntensity.json");
const data = JSON.parse(rawData);

// Function to insert data into MySQL
function insertDataIntoMySQL() {
  const connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
      return;
    }

    // Iterate through the JSON data and insert into the database
    data.forEach((item) => {
      const sqlQuery = `INSERT INTO trainingIntensity (vo2max_id, easyLongRun1000m, tempoRun400m, tempoRun1000m, intervalTraining400m, repetitionTraining400m) 
                        VALUES (${item.vo2max_id}, '${item.easyLongRun1000m}', '${item.tempoRun400m}', '${item.tempoRun1000m}', '${item.intervalTraining400m}', '${item.repetitionTraining400m}')`;

      connection.query(sqlQuery, (error) => {
        if (error) {
          console.error("Error inserting data: ", error);
        }
      });
    });

    connection.end();
    console.log("Data inserted successfully!");
  });
}

insertDataIntoMySQL();
 */
