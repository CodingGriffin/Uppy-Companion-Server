const express = require('express')
const companion = require('@uppy/companion')
const session = require('express-session')

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
      key: process.env.GOOGLE_KEY || '704958830010-8ksj7hhie33b3ui2elhdpu8elhnrpdhq.apps.googleusercontent.com',
      secret: process.env.GOOGLE_SECRET || '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',
      credentialsURL: 'http://localhost:3020/drive/send-token'
    }
  },
  corsOrigins: true, // For development. In production, specify exact domains
  uploadUrls: [
    'http://45.144.28.239:3000/uploads'  // Your TUS server URL through ngrok
  ],
  streamingUpload: {
    socketTimeout: 300000, // 5 minutes
    endpoint: 'http://45.144.28.239:3000/uploads',
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