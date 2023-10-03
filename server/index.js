const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const homeRouter = require("./routes/Home");
app.use("/home", homeRouter);

const searchRouter = require("./routes/Search");
app.use("/search", searchRouter);

const searchResultRouter = require("./routes/SearchResult");
app.use("/searchresult", searchResultRouter);

const itemSpecificationRouter = require("./routes/ItemSpecification")
app.use("/itemspec", itemSpecificationRouter)

app.listen(3001, ()=>{
    console.log("Server listening on port 3001");
})
