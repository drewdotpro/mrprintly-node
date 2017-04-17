"use strict";
const mrPrintly = require("./index.js");
const mr = new mrPrintly("LOCALHOST", "a2a8d5ac-7dea-42a8-9dee-8e2d7f902e9a");

return mr.design("58a5a1f15d80bc7b69c5549a")
    .then(res => {
        console.log(res);
        //console.log(res);
    })
    .catch(e => {
        console.log(e);
    });