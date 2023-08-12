const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

app.listen(3001, ()=>{
    console.log("Server listening on port 3001");
})
