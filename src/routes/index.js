'use strict';

const express = require("express");
const router = express.Router();

//Rutas de la aplicación 

router.get('/', ( request, response ) => {
     response.send("Hello Worlk");
});











module.exports = router;
