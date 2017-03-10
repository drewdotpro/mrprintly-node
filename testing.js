"use strict";

const mrPrintly = require("./index.js");
const mr = new mrPrintly("TEST", "ABC");

return mr.user()
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });