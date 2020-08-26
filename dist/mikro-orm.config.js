"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants/constants");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entitiesDirs: ['./dist/entities'],
    entitiesDirsTs: ['./src/entities'],
    dbName: "reddit",
    type: "mysql",
    user: "root",
    host: "localhost",
    password: "root",
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map