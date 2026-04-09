const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.use(express.json());

const DIR = process.env.HOME + '/downloads';
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

app.get('/', (req, res) => {
  res.json({
    name: 'TAMIM Downloader API 👽🔥',
    status: 'Online',
    usage: 'POST /download { "url": "video_url" }'
  });
});

app.post('/download', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL dao!' });

  res.json({ message: 'Download shuru hoye gese! ⏳', url });

  const cmd = `yt-dlp -o "${DIR}/%(title)s.%(ext)s" "${url}"`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) console.log('Error:', stderr);
    else console.log('Done:', stdout);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`TAMIM API running on port ${PORT} 👽🚀`);
});
