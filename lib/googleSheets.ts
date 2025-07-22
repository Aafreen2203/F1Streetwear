// lib/googleSheets.ts
interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  timestamp?: string;
  formType: "signup" | "newsletter" | "contact" | "forgot-password";
}

export async function submitToGoogleSheets(data: FormData) {
  try {
    // Add timestamp
    const formDataWithTimestamp = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // For demo purposes, we'll use a mock Google Apps Script Web App URL
    // In production, you would replace this with your actual Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycby2ksc_gVGO__K-SPn6AM3xR_L3j97GhEdJZ13MifkgH3h-VcjYpZ4vUpW0_GjLdaDacQ/exec";

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataWithTimestamp),
    });

    // Since we're using no-cors mode, we can't read the response
    // We'll assume success if no error is thrown
    console.log("Data submitted to Google Sheets:", formDataWithTimestamp);
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { success: false, error };
  }
}

// Google Apps Script code (to be deployed as a Web App):
/*
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Form Type', 'Email', 'First Name', 'Last Name']]);
    }
    
    // Add the data
    sheet.appendRow([
      data.timestamp,
      data.formType,
      data.email,
      data.firstName || '',
      data.lastName || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/
