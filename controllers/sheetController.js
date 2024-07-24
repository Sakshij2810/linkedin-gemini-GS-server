import { google } from "googleapis";
import Sheet from "../model/sheetModel.js";

export const getSheetData = async (req, res) => {
  try {
    const { token, sheetId } = req.body;

    if (!token || !sheetId) {
      return res.status(401).send("Access token, sheetId not found");
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: token });

    // Verify the token
    await auth.getAccessToken().catch((err) => {
      return res.status(401).send("Invalid access token");
    });

    const sheets = google.sheets({ version: "v4", auth });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A1:D10",
    });

    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).send("Error fetching data from Google Sheets");
  }
};

export const getSheetId = async (req, res) => {
  try {
    const { user, title, imageUrls, sheetId } = req.body;

    const sheetIdData = await Sheet.create({
      user,
      title,
      imageUrls,
      sheetId,
    });

    res.status(200).json(sheetIdData);
  } catch (error) {
    res.status(404).json({ error, message: "Sheet Id error" });
  }
};
