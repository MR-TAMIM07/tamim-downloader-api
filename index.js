const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ name: 'TAMIM Downloader API 👽🔥', status: 'Online' });
});

app.get('/alldl', (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL dao!' });

  const cmd = `yt-dlp --get-url --no-playlist "${url}"`;
  exec(cmd, (err, stdout, stderr) => {
    if (err || !stdout.trim()) {
      return res.status(500).json({ error: 'Failed', details: stderr });
    }
    const links = stdout.trim().split('\n');
    res.json({ result: links[0], cp: 'Downloaded via TAMIM API 👽' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TAMIM API running on port ${PORT} 👽🚀`);
});
