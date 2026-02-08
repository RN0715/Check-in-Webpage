# 🎟️ Event Check-In System (Google Apps Script)

A serverless, web-based event check-in dashboard built using **Google Apps Script** and **Google Sheets**.  
Designed for event organizers to manage attendees, track live attendance, and export data — with **zero server or hosting costs**.

---

## 📸 Project Overview

A modern, dark-themed interface optimized for event environments and quick check-ins.

> Built and deployed for **“The Spirits GENESIS – Fresher’s Meetup 2025”**

---

## ✨ Key Features

- 🔍 **Real-Time Search**  
  Search attendees instantly by ID or Name from Google Sheets.

- 📊 **Live Attendance Counter**  
  Automatically updates when participants are checked in.

- ✅ **One-Click Check-In**  
  Prevents duplicate registrations.

- ✏️ **Edit Participant Details**  
  Update name, degree, email, WhatsApp, and district.

- 📄 **Export Registered Participants**  
  Export checked-in attendees as a CSV file.

- 🔄 **Reset Attendance**  
  Clear attendance data for a new session.

- 🕒 **Activity Log**  
  Tracks check-ins, edits, exports, and resets.

- 🌑 **Dark / Glassmorphic UI**  
  High-contrast design suitable for low-light venues.

---

## 🛠️ Tech Stack

- **Frontend:**  
  HTML5, CSS3, JavaScript (Custom UI)

- **Backend:**  
  Google Apps Script (Serverless)

- **Database:**  
  Google Sheets (real-time data store)

- **Deployment:**  
  Google Apps Script Web App

---

## 🚀 How to Run / Deploy

No Python, Node.js, or servers required — only a Google account.

### Step 1: Prepare Google Sheet
1. Create a new Google Sheet
2. Name the sheet:
3. Add headers matching the backend logic (ID, Name, Degree, Email, etc.)

---

### Step 2: Setup Google Apps Script
1. Go to **https://script.google.com**
2. Create a **New Project**
3. Replace default code in `Code.gs` with the backend code from this repository
4. Create an `index.html` file and paste the frontend code

---

### Step 3: Deploy as Web App
1. Click **Deploy → New deployment**
2. Select **Web app**
3. Set:
- Execute as: **Me**
- Who has access: **Anyone**
4. Click **Deploy**
5. Open the generated Web App URL

---

## ⚠️ Important Note

This project uses:

➡️ It **will NOT work on GitHub Pages**  
➡️ GitHub is used for **code showcase and version control only**

---

## 📁 Project Structure

genesis-attendance-system/
│
├── frontend/
│ └── index.html
│
├── backend/
│ └── Code.gs
│
├── screenshots/
│ └── (UI screenshots)
│
└── README.md

---

## 👩‍💻 Author

**K.W.R.Nethmini**  
Sri Lanka 🇱🇰  

GitHub: https://github.com/RN0715


