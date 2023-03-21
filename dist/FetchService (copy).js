"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const services = {
    getSmhiTimes: getSmhiTimes
};
function getSmhiTimes() {
    const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/validtime.json';
    const promise = (0, node_fetch_1.default)(url);
    return promise
        .then(res => res.json())
        .catch(err => console.log(`error: ${err}`));
}
;
exports.fetchService = services;
