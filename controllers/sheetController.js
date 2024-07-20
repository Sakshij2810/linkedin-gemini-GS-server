import { google } from "googleapis";

export const getSheetData = async (req, res) => {
  try {
    const { token, sheetId } = req.body;

    if (!token || !sheetId) {
      return res.status(401).send("Access token and sheetId not found");
    }

    const sheets = google.sheets({ version: "v4", auth: token });
    const spreadsheetId = sheetId;
    const range = "Sheet1!A1:D10"; // Modify this to your desired range

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    console.log(result);

    res.status(200).json(result.data);
  } catch (err) {
    console.error("Error fetching data from Google Sheets: ", err);
    res.status(500).send("Error fetching data from Google Sheets");
  }
};
