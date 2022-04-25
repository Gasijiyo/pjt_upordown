// 주식 검색 후 지표출력 페이지 Router

const express = require('express');
const router = express.Router();
const path = require('path');
const bp = require('body-parser');
const cors = require('cors');
var request = require('request');
// const {spawn} = require('child_process');


router.use(bp.urlencoded({ extended: false}))
router.use(cors())
router.use(bp.json())
router.use(express.static(path.join(__dirname, "../../build/public")))


router.get('/*', function(req, res, next){
    res.sendFile( path.join(__dirname, "../../front/build/index.html"))
    console.log('get')
})

router.post('/', function(req, res, next){
    console.log('param=',req.body.param)
    console.log('ticker=', req.body.ticker)

    if(req.body.param != null){
        const giveParam = (callback) => {
            const options = {
                method:'POST',
                uri:"http://127.0.0.1:5000/test",
                qs:{
                    file: req.body.param
                }
            }
    
            request(options, function(err, res, body){
                callback(undefined, {
                    result:body
                });
            });
        }
    
        giveParam((err, {result}={})=>{
            if(err){
                console.log("error!!!!");
                res.send({
                    message:"fail",
                    status: "fail"
                });
            }
            let json = JSON.parse(result);
            res.send({
                message:"from flask",
                status: "success",
                data:{
                    json
                }
            });
        })   
    }else if(req.body.ticker != null){
        console.log('pred_ticker = ',req.body.ticker)
        const giveParam = (callback) => {
            const options = {
                method:'POST',
                uri:"http://127.0.0.1:5000/pred",
                qs:{
                    ticker: req.body.ticker,
                    day: req.body.value1,
                    feature: req.body.value2
                }
            }
    
            request(options, function(err, res, body){
                callback(undefined, {
                    result:body
                });
            });
        }
    
        giveParam((err, {result}={})=>{
            if(err){
                console.log("error!!!!");
                res.send({
                    message:"fail",
                    status: "fail"
                });
            }
            let json = JSON.parse(result);
            res.send({
                message:"from flask",
                status: "success",
                data:{
                    json
                }
            });
        })   
    }
    
    

    // 파이썬 파일로 보내기
//     const spawn = require('child_process').spawn;

//     const give = spawn('python', ['get.py', result[0], result[1]]);
//     give.stdout.on('data', (re)=> { 
//     console.log(re.toString()); 
//     });
//     give.stderr.on('data', (re)=> { console.log(re.toString()); }); 
// })


// router.get('*', function(req, res, next){
//     res.sendFile( path.join(__dirname, "../../front/build/index.html"))
//     console.log('get')
});


module.exports = router;