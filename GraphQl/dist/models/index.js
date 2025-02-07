"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;
if (!db) {
    db = {};
    const operatorsAliases = {
        $in: sequelize.Op.in
    };
    config = Object.assign({ operatorsAliases }, config);
    const _sequelize = new sequelize(config.database, config.username, config.password, config);
    fs.readdirSync(__dirname)
        .filter((file) => {
        const fileSlice = file.slice(-3);
        return (file.indexOf('.') !== 0) && (file !== basename) && (fileSlice === '.js' || fileSlice === '.ts');
    })
        .forEach((file) => {
        const model = _sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db['sequelize'] = _sequelize;
}
exports.default = db;
