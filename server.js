const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve assetlinks.json for Android verification
app.get('/.well-known/assetlinks.json', (req, res) => {
  res.type('application/json').send([
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'eu.trans.loads2do',
        sha256_cert_fingerprints: [
          'D7:40:64:63:15:8C:B5:A6:8D:E0:00:AB:B2:7A:5C:32:4B:80:72:B1:3B:47:02:B3:04:45:EE:FB:C9:E1:6C:9B',
        ],
      },
    },
  ]);
});

// Simple homepage to test
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Test Deep Link</h1>
        <p><a href="intent://test#Intent;scheme=myapp;package=eu.trans.loads2do;end">Open App (Android Intent Link)</a></p>
        <p><a href="myapp://test">Open App (Custom Scheme)</a></p>
        <p><a href="/tt/?c=666-666&p=+48726878974">Test /tt/ Deep Link</a></p>
      </body>
    </html>
  `);
});

// Add /tt/ route for deep link testing
app.get('/tt/', (req, res) => {
  // You can redirect to your app's custom scheme if you want:
  // res.redirect('myapp://tt/?' + new URLSearchParams(req.query).toString());

  // Or just show a test page:
  res.send(`
    <html>
      <body>
        <h1>/tt/ Deep Link Test</h1>
        <pre>${JSON.stringify(req.query, null, 2)}</pre>
        <p>This page is for testing /tt/ deep links.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});
