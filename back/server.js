// port번호 설정 및 서버시작

const express = require('express');
const app = express();
const routes = require('./routes/mainRouter');
const cors = require('cors');
const port = 8011;

app.use('/', routes);
app.use(cors())
// const corsOptions = {
//     origin: "http://localhost:8011"
// }

// port 번호 확인
app.listen(port, function(){
    console.log(`on ${port}`)
})