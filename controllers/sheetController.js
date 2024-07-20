import { google } from "googleapis";

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
