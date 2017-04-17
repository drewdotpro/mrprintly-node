"use strict";
const _ = require("lodash");
const request = require('request-promise');
const assert = require("assert");
const fs = require("fs");

const environments = {
    "LIVE": "https://api.mrprintly.com/v1/",
    "TEST": "https://testapi.mrprintly.com/v1/",
    "LOCALHOST": "http://localhost:1337/v1/"
};


module.exports = function (e, a) {

    const environment = e;

    const apiKey = a;

    let endpoint;

    //Validate construction
    const validate = () => {
        if (!environments.hasOwnProperty(environment)) {
            throw new Error("Unknown Environment, please use one of: " + Object.keys(environments));
        }
        if (_.isNil(apiKey)) {
            throw new Error("You must provide an API key");
        }
        endpoint = environments[environment];
    };

    //Make request object with defaults
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

    const send = (obj) => {
        return request(withDefaults(obj))
    };

    const getOne = (route, id) => {
        assert(id, "You must provide an id");
        return send({url: route + "/" + id});
    };

    const deleteOne = (route, id) => {
        assert(id, "You must provide an id");
        return send({method: "DELETE", url: route + "/" + id});
    };

    const get = (route, page) => {
        return send({url: route, qs: {page: page}});
    };

    const post = (route, body) => {
        return send({method: "POST", url: route, body: body});
    };


    //Check for API being available.
    const apiAvailable = () => {
        return send({url: ""})
            .then(() => {
                return Promise.resolve(true);
            })
            .catch(e => {
                return Promise.resolve(false);
            });
    };


    //Get User
    const user = () => {
        return send({url: "user"});
    };


    //Get a single product
    const product = (id) => {
        return getOne("product", id);
    };

    //Get all products
    const products = (page) => {
        return get("product", page);
    };

    //Get a single product variant
    const productVariant = (id) => {
        return getOne("product/variant", id);
    };

    //Get a single product variant image
    const productVariantImage = (id, path) => {
        assert(path, "You must provide a path");
        return new Promise((resolve, reject) => {
            const req = getOne("product/variant/image", id);
            const stream = req
                .pipe(fs.createWriteStream(path));
            stream.on('finish', () => {
                return resolve(true);
            });
            req.catch(e => {
                return reject(e);
            });
        });
    };

    //Information for a single Design
    const design = (id) => {
        return getOne("design", id);
    };

    //Get a single design image
    const designImage = (id, path) => {
        assert(path, "You must provide a path");
        return new Promise((resolve, reject) => {
            const req = getOne("design/image", id);
            const stream = req
                .pipe(fs.createWriteStream(path));
            stream.on('finish', () => {
                return resolve(true);
            });
            req.catch(e => {
                return reject(e);
            });
        });
    };

    //Get designs
    const designs = (page) => {
        return get("design", page);
    };

    // Create a design
    // A) From a file using the path parameter
    // B) from an accessible url in body.designURL
    const createDesign = (body, path) => {
        if (path) {
            const req = send({
                method: "POST",
                url: "design"
            });
            const form = req.form();
            form.append('design', fs.createReadStream(path));
            for (const field in body) {
                if (body.hasOwnProperty(field)) {
                    form.append(field, body[field]);
                }
            }
            return req;
        }

        return send({
            method: "POST",
            body: body,
            url: "design"
        });
    };


    //Get a single designed product
    const designedProduct = (id) => {
        return getOne("designedProduct", id);
    };

    //Get Designed Products
    const designedProducts = (page) => {
        return get("designedProduct", page);
    };

    //Delete a Designed Product
    const deleteDesignedProduct = (id) => {
        return deleteOne("designedProduct", id);
    };

    //Create a Designed Product
    const createDesignedProduct = (body) => {
        return post("designedProduct", body);
    };

    //Get a specific Designed Product Variant
    const designedProductVariant = (id) => {
        return getOne("designedProductVariant", id);
    };

    //Delete a Designed Product Variant
    const deleteDesignedProductVariant = (id) => {
        return deleteOne("designedProductVariant", id);
    };

    //Get a Designed Product Variant Image
    const designedProductVariantImage = (id, path) => {
        assert(path, "You must provide a path");
        return new Promise((resolve, reject) => {
            const req = getOne("designedProductVariantImage", id);
            var stream = req
                .pipe(fs.createWriteStream(path));
            stream.on('finish', () => {
                return resolve(true);
            });
            req.catch(e => {
                return reject(e);
            });
        });
    };

    //Get a specific Order
    const order = (id) => {
        return getOne("order", id);
    };

    //Get Orders
    const orders = (page) => {
        return get("order", page);
    };

    //Create an Order
    const createOrder = (body) => {
        return post("order", body);
    };

    //Preview the creation of an Order
    const createOrderPreview = (body) => {
        return post("order/preview", body);
    };


    validate();
    return {
        apiAvailable,
        user,
        product,
        products,
        productVariant,
        productVariantImage,
        design,
        designImage,
        designs,
        createDesign,
        designedProducts,
        designedProduct,
        createDesignedProduct,
        deleteDesignedProduct,
        designedProductVariant,
        deleteDesignedProductVariant,
        designedProductVariantImage,
        order,
        orders,
        createOrder,
        createOrderPreview
    };

};