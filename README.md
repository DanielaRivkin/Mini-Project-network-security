# Safe Browsing Chrome Extension

This project was developed as part of a mini-project in network security.  
It is a **Chrome extension** designed to enhance user safety by detecting and blocking access to **malicious websites**.

## Project Overview

The extension monitors browsing activity and checks visited URLs against a list of predefined suspicious or malicious sites.  
When a match is found, the user is immediately alerted and navigation is blocked to help protect them from security threats.

## Technologies Used

- **JavaScript**
- **HTML**
- **Chrome Extensions API**
- **Manifest V2**

## Key Features

- **Real-Time URL Monitoring**: Continuously monitors active browsing tabs.
- **Malicious Site Detection**: Compares visited URLs to a blacklist of harmful websites.
- **Blocking Mechanism**: Prevents access to detected malicious websites.
- **User Alerts**: Notifies the user when a dangerous website is blocked.

## Project Structure

```
.
├── manifest.json          # Chrome extension configuration file
├── background.js          # Background script for monitoring tabs
├── popup.html             # User interface popup (optional)
├── popup.js               # Script for popup behavior (optional)
├── blacklist.js           # List of blacklisted malicious URLs
```

## How to Install

1. Clone or download the repository.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top right corner).
4. Click **Load unpacked** and select the project directory.
5. The extension should now appear in your Chrome toolbar.

## Purpose

The purpose of this project was to explore basic web security principles by building a proactive defense tool within the browser,  
while practicing Chrome extension development and understanding real-world network threats.
