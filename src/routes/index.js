const express = require('express');

const emprendeRoutes = require('./emprende.router')

function routerAPI(app){
    const router = express.Router();
    app.use(`/api/v1`, router);
    router.use('/startups', emprendeRoutes)
}

module.exports = routerAPI;