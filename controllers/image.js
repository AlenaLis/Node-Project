const express = require("express");
const cors = require("cors");

const crypto = require('crypto');
const fs = require('fs');

const PORT = 5000;

const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.post("/api/upload_avatar", (req, res) => {
  console.log(req.body);
  const randomString = crypto.randomBytes(5).toString('hex');
  const stream = fs.createWriteStream(`./public/images/${randomString}.png`);

  stream.on('finish', function () {
    console.log('file has been written');
    res.end('file has been written');
  });

  stream.write(Buffer.from(req.body), 'utf-8');
  stream.end();
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
