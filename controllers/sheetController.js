// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { JWT } from "google-auth-library";
// // import credentials from "../../linkedin-gemini-gs-integration-056f7e45069c.json" assert { type: "json" };

// // Function to write data into Google Sheet
// export const writeInsideGooglesheet = async (req, res) => {
//   try {
//     const serviceAccountAuth = new JWT({
//       email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const doc = new GoogleSpreadsheet(
//       "1_nKWuYT796wRkZtuPXK6OpFHkRpOfAeoFXaEnughZes",
//       serviceAccountAuth
//     );

//     await doc.loadInfo(); // loads document properties and worksheets

//     // Example of updating properties
//     await doc.updateProperties({ title: "renamed doc" });

//     const sheet = doc.sheetsByIndex[0]; // Get the first sheet or use doc.sheetsById[id] or doc.sheetsByTitle[title]

//     // Example of adding rows
//     const headers = ["Id", "Name", "Email"];
//     await sheet.setHeaderRow(headers);

//     const dataArray = [
//       { Id: 1, Name: "Sakshi", Email: "sakshi@gmail.com" },
//       { Id: 2, Name: "Vaishnavi", Email: "vaishnavi@gmail.com" },
//       { Id: 3, Name: "Ram", Email: "sakshi@gmail.com" },
//       { Id: 4, Name: "Geeta", Email: "vaishnavi@gmail.com" },
//     ];

//     await sheet.addRows(dataArray);

//     let result = { success: "ok" };
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error accessing Google Sheet:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

// // Function to read data from Google Sheet
// export const readFromGoogleSheet = async (req, res) => {
//   try {
//     const serviceAccountAuth = new JWT({
//       email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//       key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//       scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//     });

//     const doc = new GoogleSpreadsheet(
//       "1_nKWuYT796wRkZtuPXK6OpFHkRpOfAeoFXaEnughZes",
//       serviceAccountAuth
//     );

//     await doc.loadInfo(); // loads document properties and worksheets

//     const sheet = doc.sheetsByIndex[0]; // Assuming you want to read from the first sheet

//     // Load all rows from the sheet
//     const rows = await sheet.getRows();

//     // Map rows to get the raw data
//     const rowData = rows.map((row) => row._rawData);

//     // Log the row data
//     rowData.forEach((row, index) => {
//       console.log(`Row ${index + 1}:`, row);
//     });

//     res.status(200).json(rowData); // Send rows as JSON response
//   } catch (error) {
//     console.error("Error reading from Google Sheet:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

// seperateion //////////////////////////////////////////////////////////////////////

// import { GoogleSpreadsheet } from "google-spreadsheet";

// // Function to write data into Google Sheet
// export const writeInsideGooglesheet = async (req, res) => {
//   try {
//     const { accessToken } = req.user;
//     const doc = new GoogleSpreadsheet(
//       "1_nKWuYT796wRkZtuPXK6OpFHkRpOfAeoFXaEnughZes"
//     );

//     await doc.useOAuth2Client(accessToken);

//     await doc.loadInfo(); // loads document properties and worksheets

//     const sheet = doc.sheetsByIndex[0]; // Get the first sheet or use doc.sheetsById[id] or doc.sheetsByTitle[title]

//     // Example of adding rows
//     const headers = ["Id", "Name", "Email"];
//     await sheet.setHeaderRow(headers);

//     const dataArray = [
//       { Id: 1, Name: "Sakshi", Email: "sakshi@gmail.com" },
//       { Id: 2, Name: "Vaishnavi", Email: "vaishnavi@gmail.com" },
//     ];

//     await sheet.addRows(dataArray);

//     let result = { success: "ok" };
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error accessing Google Sheet:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

// // Function to read data from Google Sheet
// export const readFromGoogleSheet = async (req, res) => {
//   try {
//     const { accessToken } = req.user;
//     const doc = new GoogleSpreadsheet(
//       "1_nKWuYT796wRkZtuPXK6OpFHkRpOfAeoFXaEnughZes"
//     );

//     await doc.useOAuth2Client(accessToken);

//     await doc.loadInfo(); // loads document properties and worksheets

//     const sheet = doc.sheetsByIndex[0]; // Assuming you want to read from the first sheet

//     // Load all rows from the sheet
//     const rows = await sheet.getRows();

//     // Map rows to get the raw data
//     const rowData = rows.map((row) => row._rawData);

//     // Log the row data
//     rowData.forEach((row, index) => {
//       console.log(`Row ${index + 1}:`, row);
//     });

//     res.status(200).json(rowData); // Send rows as JSON response
//   } catch (error) {
//     console.error("Error reading from Google Sheet:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

import { google } from "googleapis";

export const getSheetData = async (req, res) => {
  try {
    if (!req.isAuthenticated() || !req.user.accessToken) {
      return res.status(401).send("Unauthorized");
    }

    const sheets = google.sheets({ version: "v4", auth: req.user.accessToken });
    const spreadsheetId = "1_nKWuYT796wRkZtuPXK6OpFHkRpOfAeoFXaEnughZes";
    const range = "Sheet1!A1:D10"; // Modify this to your desired range

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.json(result.data);
  } catch (err) {
    res.status(500).send("Error fetching data from Google Sheets");
  }
};
