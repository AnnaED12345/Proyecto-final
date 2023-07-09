const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Definimos una función que recoja el código dónde se gestionan las rutas de la aplicación

export default function rutasApp (app) {

    //GET: ruta para recibir los usuarios con sus listas:
    app.get("/users/:user_id/list", (req, res) => {
        const usuarioId = req.params.user_id

    prisma.usuario.findUnique({
        where: {
            id: usuarioId 
        },
        include: {
            listas: true //incluye las listas
        }
    }).then((user) => {
       res.send(user);
    }).catch(error => {
        res.status(400).send(error)
    } )
})

    //POST: ruta para crear listas:
    app.post("/users/:user_id/list", (req, res) => {
        const nuevaLista = req.body.titulo
        const usuarioID = req.params.user_id

        prisma.lista.create ({
            data: {
                titulo: nuevaLista,
                
                usuario: { 
                    connect: { //conectamos la creación de la lista al usuario
                        id: usuarioID
                    }
              },
            }
                }).then(nuevaLista => {
                res.status(201).send(nuevaLista);
            }).catch(error => {
                res.status(400).send(error)
            } )
    });

    //PUT: ruta para editar listas:
    app.put("/users/:user_id/list/:list_id", (req, res) => {
        const listaModificada = req.params.list_id;
        const tituloLista = req.body.titulo

        prisma.lista.update({
            where: {
                id: listaModificada 
                },
                data: {
                     titulo: tituloLista
                }
            }).then(listaActualizada => {
           res.send(listaActualizada)
        }).catch(error => {
            res.status(400).send(error)
        })
    });

    //DELETE: ruta para borrar listas:
    app.delete("/users/:user_id/list/:list_id", (req, res) => {
        const borrarLista = req.params.list_id;
        prisma.lista.delete({
            where: {
            id: borrarLista
        }
        }).then(listaEliminada => {
            res.send(listaEliminada);
        }).catch(error =>{
            res.send(error)
        })  
    }); 


    //GET: ruta para recibir las tareas de la lista: 
    app.get("/list/:list_id/task", (req, res) => {
        const listaId = req.params.list_id

    prisma.lista.findUnique({
        where: {
            id: listaId 
        },
        include: {
            tareas: true //incluye las tareas
        }
    }).then((tareas) => {
       res.send(tareas);
    }).catch(error => {
        res.status(400).send(error)
    } )
})

    //POST: ruta para crear tareas:
    app.post("/list/:list_id/task", (req, res) => {
        const nuevaTarea = req.body.descripcion
        const listaId = req.params.list_id

        prisma.tarea.create ({
            data: {
                descripcion: nuevaTarea,
                
                usuario: { 
                    connect: { //conectamos la creación de la tarea a la lista
                        listaId: listaId
                    }
              },
            }
                }).then(nuevaTarea => {
                res.status(201).send(nuevaTarea);
            }).catch(error => {
                res.status(400).send(error)
            } )
    });

    //Put: ruta para editar tareas:
    app.put("/list/:list_id/task/:task_id", (req, res) => {
        const tareaEditada = req.params.task_id;
        const descripcion = req.body.descripcion

        prisma.tarea.update({
            where: {
                id: tareaEditada 
                },
                data: {
                     titulo: descripcion
                }
            }).then(tareaActualziada => {
           res.send(tareaActualziada)
        }).catch(error => {
            res.status(400).send(error)
        })
    });

    //DELETE: ruta para borrar tareas:
    app.delete("/list/:list_id/task/:task_id", (req, res) => {
        const tareaParaBorrar = req.params.task_id;
        prisma.tarea.delete({
            where: {
            id: tareaParaBorrar
        }
        }).then(tareaEliminada => {
            res.send(tareaEliminada);
        }).catch(error =>{
            res.send(error)
        })  
    }); 


}
