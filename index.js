const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');
const fb = require('@xaviabot/fb-downloader');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ name: 'TAMIM Downloader API 👽🔥', status: 'Online' });
});

app.get('/alldl', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL dao!' });

  try {
    if (/tiktok\.com/.test(url)) {
      const r = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
      if (r.data.code !== 0) throw new Error('TikTok failed');
      return res.json({ result: r.data.data.play, cp: r.data.data.title });

    } else if (/facebook\.com|fb\.watch/.test(url)) {
      const data = await fb(url);
      return res.json({ result: data.hd || data.sd, cp: 'Facebook Video' });

    } else if (/youtu\.be|youtube\.com/.test(url)) {
      exec(`yt-dlp --get-url -f b "${url}"`, (err, stdout) => {
        if (err || !stdout.trim()) return res.status(500).json({ error: 'YT failed' });
        return res.json({ result: stdout.trim().split('\n')[0], cp: 'YouTube Video' });
      });
      return;

    } else {
      return res.status(400).json({ error: 'Unsupported platform' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TAMIM API running 👽🚀`));
