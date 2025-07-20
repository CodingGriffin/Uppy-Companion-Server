# Uppy Google Drive Integration Demo

A React application demonstrating file uploads from Google Drive using Uppy with a companion server backend.

## Features

- 📁 Google Drive integration for file selection
- 🚀 Resumable uploads using TUS protocol
- 📊 Real-time upload progress tracking
- 🎨 Clean, responsive dashboard UI
- 🔒 Secure OAuth authentication

## Prerequisites

- Node.js (^18.20.0 || ^20.15.0 || >=22.0.0)
- Google Drive API credentials
- TUS server endpoint (for file uploads)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd uppy-google-drive-demo
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Session and security
SESSION_SECRET=your-session-secret-here
COMPANION_SECRET=your-companion-secret-here

# Google Drive API credentials
GOOGLE_KEY=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Optional: Other cloud providers
DROPBOX_KEY=your-dropbox-key
DROPBOX_SECRET=your-dropbox-secret
BOX_KEY=your-box-key
BOX_SECRET=your-box-secret
ONEDRIVE_KEY=your-onedrive-key
ONEDRIVE_SECRET=your-onedrive-secret
```

## Google Drive API Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3020/companion/drive/redirect`
5. Copy the Client ID and Client Secret to your `.env` file

## Configuration

### TUS Endpoint

Update the TUS endpoint in `src/App.js`:

```javascript
.use(Tus, {
  endpoint: 'YOUR_TUS_AWS_ENDPOINT', // Replace with your actual TUS server
  retryDelays: [0, 1000, 3000, 5000]
})
```

### Upload Destination

Modify the `uploadUrls` in `server.js` to point to your upload destination:

```javascript
const uploadUrls = ['http://your-upload-server.com/uploads']
```

## Usage

1. Start the companion server:
```bash
npm run server
```

2. In a new terminal, start the React development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

4. Click on "Google Drive" in the dashboard to authenticate and select files

## Project Structure

```
uppy-google-drive-demo/
├── src/
│   └── App.js              # Main React component with Uppy configuration
├── server.js               # Companion server for OAuth and file handling
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (create this)
└── README.md              # This file
```

## Key Dependencies

- **@uppy/core**: Core Uppy functionality
- **@uppy/react**: React components for Uppy
- **@uppy/google-drive**: Google Drive integration
- **@uppy/companion**: Server-side OAuth and file handling
- **@uppy/dashboard**: File upload dashboard UI

## Scripts

- `npm start`: Start the React development server
- `npm run server`: Start the companion server

## Troubleshooting

### Common Issues

1. **OAuth errors**: Ensure your Google Drive API credentials are correct and the redirect URI matches exactly
2. **CORS issues**: The companion server is configured for development with `corsOrigins: true`
3. **Upload failures**: Verify your TUS endpoint is accessible and properly configured

### Development vs Production

This setup is configured for development. For production:

1. Update `corsOrigins` in `server.js` to specify exact domains
2. Use HTTPS for all endpoints
3. Set secure session configurations
4. Use environment-specific upload URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details