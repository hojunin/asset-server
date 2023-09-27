const express = require('express');
const app = express();
app.use(express.static('images'));
app.get('/test', (req, res) => {
  res.send('GET 요청이 수신되었습니다.');
});
app.listen(4000);
