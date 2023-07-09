const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenido al servidor');
});


app.get("/usuarios", (req, res) => { //con el metodo get leemos los recursos
    prisma.usuario.findMany().then(usuarios => { //le decimos a prisma que desde mongoDB lea todas las tareas
    console.log(usuarios);
    res.send(usuarios); //respondemos enviando el array de tareas
  })
  });



app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
});

