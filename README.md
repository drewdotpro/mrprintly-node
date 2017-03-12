# MrPrintly
MrPrintly.com API NodeJS Library (pre-release)

## TODO
Unit Tests, version bump to 1.0 on releae

## Installation
Install via npm:
```javascript
npm i mrprintly
```
## Use
````javascript
"use strict";
const MrPrintly = require("mrprintly");

//TEST and test API key, or LIVE and live API key
const api = new MrPrintly("TEST", "a2a8d5ac-7dea-42a8-9dee-8e2d7f902e9a")
````
You cant then use api as follows: 

## Functions
### General
#### api.apiAvailable()
````
return api
    .apiAvailable()
    .then(result => {
       console.log("API is " + result ? "avaiable" : "not available"); 
    });
````
### User
#### api.user()
```
return api.user()
    .then(user => {
       console.log(user);
    })
    .catch(e => {
        console.error(e);
    });
```
### Product
#### api.product(id)
```
return api.product("123")
    .then(product => {
       console.log(product);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.products(page)
```
return api.products(1)
    .then(products => {
       console.log(products);
    })
    .catch(e => {
        console.error(e);
    });
```
### Product Variant
#### api.productVariant(id)
```
return api.productVariant("456")
    .then(productVariant => {
       console.log(productVariant);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.productVariantImage(id, path)
```
return api.productVariantImage("456", "./save/here.jpg")
    .then(()=> {
       console.log("image retrieved and saved");
    })
    .catch(e => {
        console.error(e);
    });
```
### Design
#### api.design(id)
```
return api.design("789")
    .then(design => {
       console.log(design);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.designs(page)
```
return api.designs(1)
    .then(designs => {
       console.log(designs);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.createDesign(body, path)
Either with a URL:
```
return api.createDesign({
        name: "my design",
        designURL: "http://myserver.com/public/image.png"
    })
    .then(result => {
       console.log("Saved under id of " + result_id);
    })
    .catch(e => {
        console.error(e);
    });
```
Or with a file path:
```
return api.createDesign({
        name: "my design"
    }, 
    "./path/to/my/file.png)
    .then(result => {
       console.log("Saved under id of " + result_id);
    })
    .catch(e => {
        console.error(e);
    });
```
### Designed Product
#### api.designedProducts(page)
```
return api.designedProducts(1)
    .then(designedProducts => {
       console.log(designedProducts);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.designedProduct(id)
```
return api.designedProduct("ABC")
    .then(designedProduct => {
       console.log(designedProduct);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.createDesignedProduct(body)
```
return api.createDesignedProduct({
        "productId": "000000000000000000000000",
        "designId": "58a59d5d5d80bc7b69c55499",
        "productVariantIds": [
            "000000000000000000000001",
            "000000000000000000000002"
        ]
    })
    .then(designedProduct => {
       console.log(designedProduct);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.deleteDesignedProduct(id)
```
return api.deleteDesignedProduct("DEF")
    .then(() => {
       console.log("Designed Product Deleted");
    })
    .catch(e => {
        console.error(e);
    });
```
### Designed Product Variant
#### api.designedProductVariant(id)
```
return api.designedProductVariant("GHI")
    .then(designedProductVariant => {
       console.log(designedProductVariant);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.deleteDesignedProductVariant(id)
```
return api.deleteDesignedProductVariant("GHI")
    .then(() => {
       console.log("Designed Product VariantDeleted");
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.designedProductVariantImage(id)
```
return api.designedProductVariantImage("JKL", "./save/it/here.jpg")
    .then(()=> {
       console.log("image retrieved and saved");
    })
    .catch(e => {
        console.error(e);
    });
```
### Order
#### api.order(id)
```
return api.order("001")
    .then(order => {
       console.log(order);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.orders(page)
```
return api.orders(1)
    .then(orders => {
       console.log(orders);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.createOrder(body)
```
const orderRequest = {
    "shippingName": "Joe Bloggs",
    "shippingAddressLine1": "123 Fake Street",
    "shippingAddressLine2": "Fakesville",
    "shippingAddressCity": "Fakerton",
    "shippingAddressCounty": "Fakeshire",
    "shippingAddressPostCode": "1F123KE",
    "lines": [
            {
                "designedProductVariantId": "58a362802b050e60fbf51de6",
                "quantity": 10
            },
            {
                "designedProductVariantId": "58a362802b050e60fbf51de7",
                "quantity": 20
            }
        ]
};
return api.createOrder(orderRequest)
    .then(order => {
       console.log(order);
    })
    .catch(e => {
        console.error(e);
    });
```
#### api.createOrderPreview(body)
See what your completed order would look like without committing
```
const orderRequest = {
    "shippingName": "Joe Bloggs",
    "shippingAddressLine1": "123 Fake Street",
    "shippingAddressLine2": "Fakesville",
    "shippingAddressCity": "Fakerton",
    "shippingAddressCounty": "Fakeshire",
    "shippingAddressPostCode": "1F123KE",
    "lines": [
            {
                "designedProductVariantId": "58a362802b050e60fbf51de6",
                "quantity": 10
            },
            {
                "designedProductVariantId": "58a362802b050e60fbf51de7",
                "quantity": 20
            }
        ]
};
return api.createOrderPreview(orderRequest)
    .then(orderPreview => {
       console.log(orderPreview);
    })
    .catch(e => {
        console.error(e);
    });
```