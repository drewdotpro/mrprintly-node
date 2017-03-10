"use strict";
const _ = require("lodash");
const request = require('request-promise');


const environments = {
    "LIVE": "https://api.mrprintly.com/v1/",
    "TEST": "https://testapi.mrprintly.com/v1/"
};


module.exports = function (e, a) {

    const environment = e;

    const apiKey = a;

    let endpoint;

    const validate = () => {
        if (!environments.hasOwnProperty(environment)) {
            throw new Error("Unknown Environment, please use one of: " + Object.keys(environments));
        }
        if (_.isNil(apiKey)) {
            throw new Error("You must provide an API key");
        }
        endpoint = environments[environment];
    };

    const withDefaults = (obj) => {
        const defaults = {
            headers: {
                "X-API-KEY": apiKey
            },
            json: true,
            uri: endpoint + obj.url
        };
        return _.defaultsDeep({}, obj, defaults);
    };

    const apiAvailable = () => {
        return request(withDefaults({url: ""}))
            .then(() => {
                return Promise.resolve(true);
            })
            .catch(e => {
                return Promise.resolve(false);
            });
    };

    const user = () => {
        return request(withDefaults({url: "user"}));
    };

    validate();
    return {
        apiAvailable,
        user
    };

};