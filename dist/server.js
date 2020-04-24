"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var body_parser_1 = __importDefault(require("body-parser"));
var dev = process.env.NODE_ENV !== "production";
var app = next_1.default({ dev: dev });
var handler = app.getRequestHandler();
var server = express_1.default();
var knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "salon_tablet",
        charset: "utf8mb4",
    },
});
var Bookshelf = require('bookshelf')(knex);
var PostData = Bookshelf.Model.extend({
    tableName: "post_data",
});
function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, application/json");
}
app.prepare().then(function () {
    server.use(body_parser_1.default.json());
    server.use(body_parser_1.default.urlencoded({ extended: true }));
    server.get("/post_data/get/:page", function (req, res) {
        var pg = req.params.page;
        console.log("/post_data/get/:page の  req.body" + JSON.stringify(req.params.page));
        new PostData()
            .orderBy("date", "desc")
            .fetchPage({ page: pg, pageSize: 5 })
            .then(function (result) {
            var data = {
                rawData: result.toArray(),
                pagination: result.pagination,
            };
            res.send(data);
            console.log("/post_data/get/:page のresult.pagination " +
                JSON.stringify(result.pagination));
        })
            .catch(function (err) {
            console.log(JSON.stringify(err));
            res.status(500).json({ err: true, data: { message: err.message } });
        });
    });
    server.post("/post_data/create/post", function (req, res) {
        var _a = req.body, title = _a.title, date = _a.date, content = _a.content;
        new PostData({
            title: title,
            date: date,
            content: content,
        })
            .save()
            .then(function (result) {
            console.log("create/postのresultは " + JSON.stringify(result));
            var data = {
                rawData: result,
                pagination: result.pagination,
            };
            console.log(JSON.stringify(data));
            res.send(data);
        })
            .catch(function (err) {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });
    });
    server.post("/post_data/get/singlepost", function (req, res) {
        new PostData().where('id', '=', req.body.id).fetch()
            .then(function (result) {
            var data = { rawData: result };
            res.send(data);
        })
            .catch(function (err) {
            console.log(JSON.stringify(err));
            res.status(500).json({ err: true, data: { message: err.message } });
        });
    });
    server.post("/post_data/update/post", function (req, res) {
        var _a = req.body, id = _a.id, title = _a.title, date = _a.date, content = _a.content;
        new PostData().where('id', id)
            .save({
            title: title,
            date: date,
            content: content,
        }, { patch: true })
            .then(function (result) {
            console.dir("updatepostのresultは " + JSON.stringify(result));
            var data = { rawData: result };
            res.send(data);
        })
            .catch(function (err) {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });
    });
    server.post("/post_data/delete/post", function (req, res) {
        var id = req.body.id;
        new PostData()
            .where("id", id)
            .fetch()
            .then(function (record) {
            record.destroy();
        })
            .then(function (result) {
            var data = { rawData: result };
            res.send(data);
        })
            .catch(function (err) {
            res.status(500).json({
                err: true,
                data: { message: err.message },
            });
        });
    });
    server.get("*", function (req, res) {
        return handler(req, res);
    });
    server.listen(3000, function (err) {
        if (err)
            console.error(err.stack);
        console.debug("> Ready on http://localhost:3000");
    });
})
    .catch(function (err) {
    console.error(err.stack);
    process.exit(1);
});
//# sourceMappingURL=server.js.map