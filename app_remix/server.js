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
import rutasApp from "./db/rutas-app.js";

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

app.get("/test", (req, res) => {
  res.status(200).json({"msg":"backend Funciona!"});
  });


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

rutasApp(app); //archivo dónde se gestionan las rutas del servidor



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
