const fs = require("fs");

const filePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/trainingIntensity.txt";
const jsonFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/json/trainingIntensity.json";

function readSqlFile(filePath) {
  try {
    const sqlContent = fs.readFileSync(filePath, "utf-8");
    const sqlInstructions = sqlContent
      .split(";")
      .filter((instruction) => instruction.trim() !== "");

    // Assuming your SQL file has a format where each instruction is separated by a semicolon.

    const jsonData = {
      createTable: "",
      insertData: [],
    };

    for (const instruction of sqlInstructions) {
      if (instruction.includes("CREATE TABLE")) {
        jsonData.createTable = instruction;
      } else if (instruction.includes("INSERT INTO")) {
        jsonData.insertData.push(instruction);
      }
    }

    return jsonData;
  } catch (err) {
    console.error("Error reading SQL file:", err);
    return null;
  }
}

function saveJSONToFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(jsonFilePath, jsonData);
  console.log("Conversion to JSON successful!");
}

// Example usage:

const jsonData = readSqlFile(filePath);
saveJSONToFile(jsonData);
console.log(jsonData);

/* const fs = require("fs");

const plainTextFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/trainingIntensity.txt";
const jsonFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/json/trainingIntensity.json";

function convertToJSON(sqlInstruction) {
  const values = sqlInstruction.match(/\(([^)]+)\)/)[1].split(",");
  const headers = sqlInstruction.match(/\(([^)]+)\)/)[1].split(",");
  const result = {};

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i].trim();
    const value = values[i].replace(/'/g, "").trim();
    result[header] = isNaN(value) ? value : Number(value);
  }

  return result;
}

function readTextFile(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function convertAllInstructionsToJSON(sqlInstructions) {
  const individualInstructions = sqlInstructions.split(";").filter(Boolean);
  console.log(individualInstructions);
  const jsonObjects = individualInstructions.map((instruction) =>
    convertToJSON(instruction.trim())
  );
  return jsonObjects;
}

function saveJSONToFile(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(jsonFilePath, jsonData);
  console.log("Conversion to JSON successful!");
}

(async () => {
  try {
    const sqlInstructions = readTextFile(plainTextFilePath);
    const jsonArray = convertAllInstructionsToJSON(sqlInstructions);
    saveJSONToFile(jsonArray);
  } catch (error) {
    console.error("Error:", error);
  }
})();

/* const plainTextFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/trainingIntensity.txt"; 
const jsonFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/json/trainingIntensity.json"; 
  */
