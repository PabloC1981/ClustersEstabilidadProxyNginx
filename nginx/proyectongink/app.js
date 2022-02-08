const express = require('express') 

const app = express();
const PORT = parseInt(process.argv[2]||8080)

//app.use(express.static('public'));

app.get('/info',(req,res)=>{
    res.send(`PORT : ${PORT} -> Con PID ${process.pid}`)
})

app.get('/random', (req,res)=>{
    console.log(`Peticion al Worker ${process.pid}`)
    let random = 0
    for (let i=0; i<5e9;i++){
        random+=i
    }
    console.log(`Peticion del Worker ${process.pid} finalizada`)
    res.send({random:random})
})

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))