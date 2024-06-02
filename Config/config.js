require("dotenv").config();
const express = require("express");


const mongoose = require("mongoose");

const clientOptions = {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      strictPopulate: false,
    },
  };
  //add your .env variables here
  module.exports = {
    dev_url: process.env.DEV_URL,
    dev_port: process.env.DEV_PORT,
    dev_uri: process.env.DEV_URI,
    dev_secret: process.env.DEV_SECRET,
    clientOptions,
    mongoose,
    express
  }

