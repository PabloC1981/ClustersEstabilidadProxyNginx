
//import express from "express";
const express = require('express');


const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

app.get('/', (req,res)=>{
    console.log('Peticion Recibida')
    res.send(`servidor express en PORT ${PORT} - PID ${process.pid}`)
})

//consola pm2 start app.js -i --watch max hacemos que trabaje completamente los CPUs Y Funciona en modo Cluster
app.get('/random', (req,res)=>{
    console.log(`Peticion al Worker ${process.pid}`)
    let random = 0
    for (let i=0; i<5e9;i++){
        random+=i
    }
    console.log(`Peticion del Worker ${process.pid} finalizada`)
    res.send({random:random})
})