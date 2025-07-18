# Carteasy

Carteasy is a lightweight Progressive Web App (PWA) for managing shopping lists. It allows users to add, remove, and delete all items. Each device gets its own list using localStorage, and data is stored in Firebase Realtime Database.

## Features

- Add and remove items
- Delete all items
- Per-device data isolation (no login required)
- Works offline (PWA)
- Installable on mobile and desktop
- Real-time sync with Firebase

## Live Demo

https://carteasy-jash.netlify.app

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jash9876/carteasy.git
cd carteasy
```

2. Open `index.html` in your browser or use Live Server.

## Firebase Setup

Data is stored under: `users/<localDeviceId>/shoppingList`

Example Firebase rules:

```json
{
  "rules": {
    "users": {
      "$userId": {
        "shoppingList": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

## File Structure

- index.html
- index.js
- index.css
- service-worker.js
- site.webmanifest
