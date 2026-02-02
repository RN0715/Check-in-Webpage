🎟️ Event Check-In System (Google Apps Script)
A serverless, web-based check-in dashboard built with Google Apps Script and Google Sheets. This system allows event organizers to manage attendees, track live attendance, and export data without any server costs or complex database setup.

Project StatusLicenseGoogle Apps Script

📸 Project Demo
A dark-themed interface designed for high visibility in event environments.

Event Dashboard Screenshot

✨ Key Features

🔍 Real-Time Search: Instantly find attendees by ID or Name directly from the Google Sheet.
📊 Live Attendance Tracking: Automatically updates the count when a user checks in.
📤 Export Data: Leverages the native Google Sheets export (CSV, Excel, PDF).
🔄 Reset Functionality: Ability to clear attendance history for a new event session.
💰 Cost Effective: Runs entirely on the free Google Workspace infrastructure.
🌑 Dark Mode UI: High-contrast interface for low-light venues.

🛠️ Tech Stack

Frontend: HTML5, CSS3 (Custom Dark Theme), JavaScript
Backend: Google Apps Script (GAS)
Database: Google Sheets (acts as the real-time database)

🚀 How to Run / Deploy

Since this is built on Google Apps Script, you don't need to install Python or Node.js. You just need a Google Account.

Step 1: Prepare the Google Sheet
Create a new Google Sheet.
Add column headers (e.g., ID, Name, Status, Timestamp).
Copy the Spreadsheet ID from the URL (it's the long string between /d/ and /edit).

Step 2: Setup the Script
Go to script.google.com.
Create a New Project.
Delete the default code in Code.gs and paste the backend code from this repository.
Create an index.html file and paste the frontend code.
Important: Update the SHEET_ID variable in Code.gs with your ID from Step 1.

Step 3: Deploy as Web App
Click the blue Deploy button > New deployment.
Select type: Web app.
Description: "Event Check-in v1".
Execute as: Me (your email).
Who has access: Anyone (This is crucial so attendees can access the link).

Click Deploy.

Use the provided Web App URL to access your dashboard.

📝 Use Case
This system was deployed for "The Spirits GENESIS - Fresher's Meetup 2025", successfully handling attendee check-ins with zero downtime and instant data synchronization.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
K.W.R.Nethmini

GitHub: @RN0715
