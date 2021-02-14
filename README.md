## ScrumLunch API

### Test assignment from [ScrumLaunch](https://www.scrumlaunch.com/) for the position of Backend Developer (Node.js)

[описание задания](https://github.com/sxidsvit/scrumlaunch-api/tree/main/supplement/task.md)

### What was used for development

#### Libraries and modules:

- [Node.JS](https://nodejs.org/en/)
- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [mongoose](https://mongoosejs.com/)
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [config](https://www.npmjs.com/package/config)

#### Technologies and tools:

- Node.js
- Express - minimalist web framework for Node.js
- JSON Web Tokens
- Decomposition of application and code
- [Postman Client](https://www.postman.com/product/rest-client/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

### How it works

![](./supplement/demo.gif)

### Running Node.js server and application for testing

1. After copying the application to your computer, you need to install the dependencies from package.json.

```js
npm install
```

2. Then run the command in the console:

```js
npm run server
```

Node.js server will be launched on port 5200.

3. It will also connect to the cloud Atlas MongoDB server (cloud.mongodb.com)

4. Install Postman Client and import [file](./supplement/ScrumLaunch.postman_collection.json) into it , which will allow API testing

5. It is recommended to use Postman Client and MongoDB Compass for API testing
