const express = require('express');
const app = require('../../app');
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`app listening on ${PORT} in ${process.env.NODE_ENV}`);
})
