const express = require ("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");



const app = express();

app.use(express.json());
app.use("/users",router)
const Port = 7000;

mongoose.connect("mongodb://localhost:27017"
).then(()=>app.listen(Port,()=>console.log(`local database Connected and listened at ${Port}`))
).catch((err)=>console.log(err));




