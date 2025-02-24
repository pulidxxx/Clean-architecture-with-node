## Proyecto de Arquitectura Limpia con NodeJS

### Instalación

1. Hace falta agregar las variables de entorno (.env), se puede usar el archivo .env.example como ejemplo para las variables
2. Instalar MySQL y en Workbench crear una base de datos, en nuesto caso la llamamos 'ecommercedb'
3. Correr el archivo [Script cracion BD](./DatabaseInfo/Script%20DB.sql)
4. Si se quiere trabajar con datos ya creados correr el archivo [Datos de prueba](./DatabaseInfo/Datos%20de%20prueba.txt)
5. Ademas se pueden importar los queries para ejecutar las consultas, usando el archivo [Queries postmna](./Queries%20postman/Clean%20architecture.postman_collection.json)
6. Instalar dependencias, desde la ubiacion raiz del programa

```bash
npm install
```

7. Levantar la base de datos

```bash
docker-compose up -d
```

8. Ejecutar proyecto en modo desarrollo

```bash
npm run dev
```

9. Deberia poder obtener los roles desde postman si se realizo bien la configuracion, para eliminar y editar usuarios hay que registrarse y loguearse antes con las respectivas queries de postman

Ciclo de vida de la aplicacion:

1. app.ts -> Starts server and database
2. server.ts -> Se instancia para escuchar las rutas desde el puerto declarado
3. database.ts -> Toma los dat os que se le pasan y hace la conexion con la base de datos
4. routes.ts -> Le dice que archivos de rutas va a usar, si hay mas tablas se crean mas archivos para usar
5. Se crea un controlador que lo retorna la app despues de crear su respectivo servicio y repositorio
6. El controlador es el que ejecuta los metodos que realizan el trabajo en la base de datos
7. para el caso de getUsers simplemente al hacer la peticion ejectua la peticion en CrudUSerMySQL
8. Si no funciona va al metodo handleError que funciona que crea un error personalizado como con Winston
9. para register, crea una clase llamada registerUserDTO que toma los parametros del req.body y los transforma en un
   RegisterUserDTO, de paso verfica que todos los campos existan
10. si se crea el usuario entonces va al caso de uso que crea al usuario
11. El caso de uso manda a service a que cree el usuario
12. Si se crea el usuario entonces
