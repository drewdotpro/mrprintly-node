"use strict";
const mrPrintly = require("./index.js");
const mr = new mrPrintly("LOCALHOST", "a2a8d5ac-7dea-42a8-9dee-8e2d7f902e9a");

return mr.designedProductVariantImage("58c46d9c6ab5ac7164f5ac04", "./hah.jpg")
    .then(res => {
        console.log(typeof res);
        //console.log(res);
    })
    .catch(e => {
        console.log(e);
    });