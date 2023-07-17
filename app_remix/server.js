import * as fs from "node:fs";

/* ESTRUCUTRA DEL DOCUMENTO: 

- Importación de los módulos utilizados
- Configuración de la aplicación de Express
- Middlewares:
  - BodyParser encargado de procesar los datos en formato JSON y convertirlos a objetos javaScript
  - BodyParser.urlencoded encargado de procesar los datos en formato x-www-form-urlencoded y convertirlos a objetos javaScript
  - Express-Session para gestionar las sesiones de usuario (almacena y permite acceder a los datos)
  - Passport para configurar la autenticación de los usuarios
    - passport.serializeUser() determina qué datos del usuario se almacenarán en la sesión (el usuario del id)
    - passport.deserializeUser() asocia los datos al usuario
    - passport-local configura una LocalStrategy para autenticar a los usuarios utilizando en este caso, su email y la contraseña
      - utilizamos bcrypt.compare para validar los datos comparandolos con los almacenados en la base de datos
- Gestión de rutas para login y logout
- authorized() para la autenticación de los usuarios
- Gestión de rutas para usuarios, listas y tareas
*/


import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import chokidar from "chokidar";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client';
import bodyParser from "body-parser";
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local'; 
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

installGlobals();

const BUILD_PATH = "./build/index.js";
/**
 * @type { import('@remix-run/node').ServerBuild | Promise<import('@remix-run/node').ServerBuild> }
 */
let build = await import(BUILD_PATH);

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));

app.use(morgan("tiny"));

app.use(bodyParser.json()); 
/* app.use(bodyParser.urlencoded({ extended: true })); */



//---------------------------- GESTIÓN DE SESIONES ----------------------------

//MIDDLEWARE EXPRESS-SESION
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
    }));


//MIDDLEWARE PASSPORT 

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) { //identificamos el usuario mediante el id: 
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    prisma.usuario.findUnique({ //para buscar al usuario por su ID en la base de datos
        where: {
          id: id,
        },
      })
      .then((user) => { 
        console.log("passport.deserializeUser", user);
        done(null, user); //pasamos los datos del usuario a través de la función done. null --> para indicar que no hay error 
      })
      //Si se produce un error durante la deserialización, se captura en el bloque catch y se pasa como argumento a done(error) para indicar que ocurrió un error.
      .catch((error) => { 
        done(error);
      });
});

passport.use( 
  new LocalStrategy(function (email, password, done) {
  prisma.usuario
    .findUnique(
      { where: { email } }) //la autenticación se realizará con el email del usuario
  
    .then((user) => {
      const valid = bcrypt.compare(password, user.password).then((valid) => {
      if (!user || !valid) return done(true); //si no coincide el usuario o la contraseña no es válida: 
      return done(null, user);
    });
  })
  .catch((err) => {
    done(err)});
  })
);



//---------------------------- RUTAS LOGIN Y LOGOUT ----------------------------

//LOGIN
app.post("/login", passport.authenticate("local"), (req, res) => {
    const user = req.user;
    res.status(200).send(user);
    });


//LOGOUT
app.get("/logout", function (req, res) {
    console.log(req.session);
    req.session.destroy((err) => {//destroy() eliminará todos los datos de la sesión y finalizará la sesión del usuario.
      if (err) { //send 400.
        res.status(400).send();
      } else { 
        res.send("No login"); //verificamos si el cierre de sesión es correcto 
      }
    })
    });



//---------------------------- AUTENTICACIÓN EN RUTAS ----------------------------

//middleware para la autenticación el cuál posteriormnete añadiremos en las rutas deseadas: 
function authorized(req, res, next) {
  if (!req.user || req.user.id !== req.params.user_id) { //si no coincide el usuario, y su id no es igual a variable en ruta
     res.status(403).send("Unauthorized");//respondemos con un 403 - no autorizado
 return;
 }
 else{console.log("Unauthorizednull");}
 next();
 }




//---------------------------- CÓDIGO PARA LA GESTIÓN DE RUTAS ----------------------------

  //GET: ruta para recibir los usuarios incluyendo sus listas:
  app.get("/users/:user_id/list", authorized, (req, res) => {
      const usuarioId = req.params.user_id;
 
  prisma.usuario.findUnique({
      where: {
          id: usuarioId 
      },
      include: {
          listas: true 
      }
  }).then((user) => {
     res.send(user);
  }).catch(error => {
      res.status(400).send(error)
  } )
})

  //POST: ruta para crear listas:
  app.post("/users/:user_id/list", authorized, (req, res) => { 
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
  app.put("/users/:user_id/list/:list_id", authorized, (req, res) => {
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
  app.delete("/users/:user_id/list/:list_id", authorized, async (req, res) => {
    const listId = req.params.list_id;

    try { // Para evitar errores en el esquema de Prisma y poder eliminar las listas aun que estas contengan tareas:
      // Primero eliminamos las tareas asociadas a la lista
      await prisma.tarea.deleteMany({
        where: {
          listaId: listId,
        },
      });
  
      // Después eliminamos la lista
      const listaEliminada = await prisma.lista.delete({
        where: {
          id: listId,
        },
      });
  
      res.send(listaEliminada);
    } catch (error) {
      res.send(error);
    }
  });


  //GET: ruta para recibir las tareas de la lista: 
  app.get("/:user_id/list/:list_id/tasks", authorized, (req, res) => {
      const listaId = req.params.list_id

  prisma.lista.findUnique({
      where: {
          id: listaId 
      },
      include: {
          tareas: true
      }
  }).then((tareas) => {
     res.send(tareas);
  }).catch(error => {
      res.status(400).send(error)
  } )
}) 

  //POST: ruta para crear tareas:
  //este POST se realizará con el formulario directamente desde el navegador, con lo cuál utilizamos el middleware bodyParser.urlencoded()
  app.post("/:user_id/list/:list_id/tasks", /* bodyParser.urlencoded(), */ authorized, (req, res) => { 
      const nuevaTarea1 = req.body.descripcion
      const listaId = req.params.list_id

      prisma.tarea
        .create({
          data: {
            descripcion: nuevaTarea1,

            lista: {
              connect: {
                id: listaId,
              },
            },
          },
        })
        .then((nuevaTarea) => {
          console.log(nuevaTarea.descripcion);
          console.log("createTask");
          res.status(201).send(nuevaTarea);
        })
        .catch((error) => {
          res.status(400).send(error);
          console.log("error");
        });
  });

  //Put: ruta para editar tareas:
  app.put("/:user_id/list/:list_id/tasks/:task_id", authorized, (req, res) => {
      const tareaEditada = req.params.task_id;
      const descripcion = req.body.descripcion

      prisma.tarea.update({
          where: {
              id: tareaEditada 
              },
              data: {
                   descripcion: descripcion
              }
          }).then(tareaActualziada => {
         res.send(tareaActualziada)
      }).catch(error => {
          res.status(400).send(error)
      })
  });

  //DELETE: ruta para borrar tareas:
  app.delete("/:user_id/list/:list_id/tasks/:task_id", authorized, (req, res) => {
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



app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? createDevRequestHandler()
    : createRequestHandler({
        build,
        mode: process.env.NODE_ENV,
      })
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);

  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
});

function createDevRequestHandler() {
  const watcher = chokidar.watch(BUILD_PATH, { ignoreInitial: true });

  watcher.on("all", async () => {
    // 1. purge require cache && load updated server build
    const stat = fs.statSync(BUILD_PATH);
    build = import(BUILD_PATH + "?t=" + stat.mtimeMs);
    // 2. tell dev server that this app server is now ready
    broadcastDevReady(await build);
  });

  return async (req, res, next) => {
    try {
      //
      return createRequestHandler({
        build: await build,
        mode: "development",
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
