/* eslint-disable */
//const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config.env' });

const userRouter = require('./Routes/userRouter');

app.use(express.json());
app.use(cookieParser());
app.use('/api', userRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});



//Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connection successful!'));