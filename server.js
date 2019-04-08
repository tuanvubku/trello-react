
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./db/dist/utils/dbConfig");
const user = require("./db/dist/api/user");
const card = require("./db/dist/api/card");
const board = require("./db/dist/api/board");
const list = require("./db/dist/api/list");
const comment = require("./db/dist/api/comment");
const app = express();
const PORT = process.env.MOCK_PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = Promise;
mongoose.connect(dbConfig.MONGO_URI, { useNewUrlParser: true });
app.use('/api/users', user.default);
app.use('/api/cards', card.default);
app.use('/api/boards', board.default);
app.use('/api/lists', list.default);
app.use('/api/comments', comment.default);

// logger
app.use('/**', (req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl} || ${JSON.stringify(req.body)}`);
    next();
});

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Database is listening on port ${PORT}`);
    }
});
