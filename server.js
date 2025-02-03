const express = require('express')
const companion = require('@uppy/companion')
const session = require('express-session')
require('dotenv').config()

const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: true
}))

const companionOptions = {
  server: {
    host: 'localhost:3020',
    protocol: 'http',
    path: '/companion'
  },
  filePath: './uploads',
  secret: process.env.COMPANION_SECRET || 'your-companion-secret',
  providerOptions: {
    drive: {
      key: process.env.GOOGLE_KEY,
      secret: process.env.GOOGLE_SECRET,
      credentialsURL: 'http://localhost:3020/companion/drive/send-token'
    },
    dropbox: {
      key: process.env.DROPBOX_KEY,
      secret: process.env.DROPBOX_SECRET,
      credentialsURL: 'http://localhost:3020/companion/dropbox/send-token'
    },
    box: {
      key: process.env.BOX_KEY,
      secret: process.env.BOX_SECRET,
    }
  },
  corsOrigins: true, // For development. In production, specify exact domains
  uploadUrls: [
    'http://everyusb.info:3000/uploads'  // Your TUS server URL through ngrok
  ],
  tusDeferredUploadLength: true,
  streamingUpload: {
    socketTimeout: 300000, // 5 minutes
    endpoint: 'http://everyusb.info:3000/uploads',
    protocol: 'tus',
    tusOptions: {
      deferredLength: true,
      removeFingerprintOnSuccess: true
    }
  }
}

// Initialize companion
const { app: companionApp } = companion.app(companionOptions)

// Mount companion
app.use('/companion', companionApp)

// Error handling
app.use((err, req, res, next) => {
  console.error('Companion Error:', err)
  res.status(err.status || 500).json({ error: err.message })
})

const server = app.listen(3020, () => {
  console.log('Companion server running on port 3020')
})

companion.socket(server, companionOptions) 