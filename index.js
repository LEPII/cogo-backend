import 'dotenv/config'
import express from 'express';

const app = express()
const port = process.env.PORT || 9000;


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});