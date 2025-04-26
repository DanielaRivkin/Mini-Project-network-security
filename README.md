# Safe Browsing Chrome Extension

This project was developed as part of a mini-project in network security.  
It is a **Chrome extension** designed to enhance user safety by detecting and blocking access to **malicious websites**.

## Project Overview

The extension monitors browsing activity and checks visited URLs against security intelligence services.  
When a potentially harmful site is detected, the user is immediately alerted and navigation is blocked.

## Technologies Used

- **JavaScript**
- **HTML**
- **Chrome Extensions API**  
  (Handles browser tabs, background scripts, and event management)
- **VirusTotal API**  
  (Used to analyze URLs and detect known malicious domains in real-time)
- **Manifest V2**

## VirusTotal API

The **VirusTotal API** aggregates data from multiple antivirus engines and URL scanning services.  
In this project, it was used to:
- **Query the VirusTotal database** with the current website's URL
- **Analyze responses** to determine if a website is flagged as malicious
- **Block navigation** and **alert users** when malicious content is detected

This integration ensures that users are protected not just by a static blacklist, but also by **up-to-date threat intelligence** from VirusTotal.

## Key Features

- **Real-Time URL Monitoring**: Continuously monitors browsing activity.
- **Live Threat Analysis**: Checks visited URLs through the VirusTotal API.
- **Malicious Site Blocking**: Prevents users from entering harmful websites.
- **User Alerts**: Notifies the user upon detection of threats.

## Project Structure

```
.
├── manifest.json          # Chrome extension configuration file
├── background.js          # Background script for monitoring tabs and querying VirusTotal
├── popup.html             # User interface popup (optional)
├── popup.js               # Script for popup behavior (optional)
├── blacklist.js           # (Optional) Locally maintained blacklist of URLs
```

## How to Install

1. Clone or download the repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top right corner).
4. Click **Load unpacked** and select the project directory.
5. The extension should now appear in your Chrome toolbar.

*Important*:  
You will need to add your own **VirusTotal API key** to the project for the live URL scanning feature to work.

## Purpose

The purpose of this project was to practice web security concepts by building a real-world proactive protection tool,  
while gaining hands-on experience with Chrome extension development and threat intelligence APIs like VirusTotal.
