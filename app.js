const express = require('express')

const app = express();

app.get('/healthcheck',(request,response)=>{
    response.send('OK')
})

app.listen(3000)