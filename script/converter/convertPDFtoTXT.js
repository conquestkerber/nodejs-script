const fs = require("fs");
const pdfParse = require("pdf-parse");

const pdfFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/trainingIntensity.pdf";
const plainTextFilePath =
  "/home/pele/Documents/Vezbanje/diplomski/tabele/trainingIntensity.txt";

async function extractTextFromPDF() {
  const pdfData = await pdfParse(fs.readFileSync(pdfFilePath));
  return pdfData.text;
}

async function savePlainTextToFile(text) {
  fs.writeFileSync(plainTextFilePath, text);
  console.log("Text extracted and saved to plain text file.");
}

(async () => {
  try {
    const pdfText = await extractTextFromPDF();
    await savePlainTextToFile(pdfText);
  } catch (error) {
    console.error("Error:", error);
  }
})();
