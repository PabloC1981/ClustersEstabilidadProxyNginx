import express from "express"
import cluster from "cluster"
import core from "os" // libreria que trabaja con el Sistema Operativo de mi PC

const app = express()
const PORT = 8080
//PROCESO PADRE//
if(cluster.isMaster){
    console.log(`Proceso primario con pid ${process.pid} corriendo`)
    for(let i=0; i<core.cpus().length; i++){
        cluster.fork();
    }
    //COMO ENCONTRAR CUANDO UN PROCESO SE HA CAIDO Y LO IDENTIFCAMOS//
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`Worker ${worker.process.pid} ha dejado de funcionar`)
        cluster.fork();
        console.log(`worker restaurado`)
    })
}else{
    console.log(`Soy un worker con pid ${process.pid}`)// Trabajadores del proceso primario
    app.listen(PORT,()=>console.log(`Worker ${process.pid} en el puerto ${PORT}`))
}

app.get('/', (req,res)=>{
    let today = new Date();
    let date = today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate()
    res.send(`Servidor express en ${PORT} - PID ${process.pid} + ${date}`)
})

//MUESTRA COMO TRABAJAN VARIOS PROCESOS CUANDO SE SATURAN LOS CPUs//
app.get('/random', (req,res)=>{
    console.log(`Peticion al Worker ${process.pid}`)
    let random = 0
    for (let i=0; i<5e9;i++){
        random+=i
    }
    console.log(`Peticion del Worker ${process.pid} finalizada`)
    res.send({random:random})
})






