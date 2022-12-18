const express = require("express");
const app = express();
app.use(express.static("images"));
app.listen(4000);
