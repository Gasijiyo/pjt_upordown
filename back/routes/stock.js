// 주식 검색 후 지표출력 페이지 Router

const express = require('express');
const router = express.Router();
const path = require('path');
const bp = require('body-parser');
const cors = require('cors');
// const {spawn} = require('child_process');


router.use(bp.urlencoded({ extended: false}))
router.use(cors())
router.use(bp.json())
router.use(express.static(path.join(__dirname, "../../front/build")))


router.get('/*', function(req, res, next){
    res.sendFile( path.join(__dirname, "../../front/build/index.html"))
    console.log('get')
})

router.post('/', function(req, res, next){
    console.log('post server ok')
    let result = req.body.props;
    console.log('post 데이터확인', result)
    // res.sendFile( path.join(__dirname, "../../front/build/index.html"))
    res.json({ticker: result[0], name: result[1]})   
    

    // 파이썬 파일로 보내기
    const spawn = require('child_process').spawn;

    const give = spawn('python', ['getGraph.py', result[0], result[1]]);
    give.stdout.on('data', (re)=> { 
        console.log(re.toString()); 
    });
    give.stderr.on('data', (re)=> { console.log(re.toString()); }); 
})


// router.get('*', function(req, res, next){
//     res.sendFile( path.join(__dirname, "../../front/build/index.html"))
//     console.log('get')
// })


module.exports = router;