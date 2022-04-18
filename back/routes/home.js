// Home(메인)page Router

const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
// const {spawn} = require('child_process');

router.use(express.static(path.join(__dirname, "../../front/build")))

router.get('/', function(req, res, next){
    res.sendFile( path.join(__dirname, "../../front/build/index.html"))
});



module.exports = router;