import React from 'react'
import Uppy from '@uppy/core'
import { Dashboard } from '@uppy/react'
import GoogleDrive from '@uppy/google-drive'
import Tus from '@uppy/tus'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

function App() {
  const uppy = new Uppy({
    debug: true,
    autoProceed: false
  })
  .use(GoogleDrive, {
    companionUrl: 'http://localhost:3020/companion',
    companionAllowedHosts: /localhost:3020/
  })
  .use(Tus, {
    endpoint: 'YOUR_TUS_AWS_ENDPOINT', // Replace with your tus-aws server endpoint
    retryDelays: [0, 1000, 3000, 5000]
  })

  uppy.on('complete', (result) => {
    console.log("Upload complete!", result.successful)
  })

  return (
    <div className="App">
      <h1>Uppy Google Drive Integration</h1>
      <Dashboard
        uppy={uppy}
        plugins={['GoogleDrive']}
        metaFields={[
          { id: 'name', name: 'Name', placeholder: 'File name' }
        ]}
      />
    </div>
  )
}

export default App 