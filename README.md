## Proyecto de Arquitectura Limpia con NodeJS

### Instalación

1. Hace falta agregar las variables de entorno (.env)
2. Instalar dependencias.
```bash
npm install
```
3. Levantar la base de datos
```bash
docker-compose up -d
```

4. Ejecutar proyecto en modo desarrollo
```bash
npm run dev
```



Ciclo de vida de la aplicacion:

1. app.ts -> Starts server and database
2. server.ts -> Se instancia para escuchar las rutas desde el puerto declarado
3. database.ts -> Toma los dat os que se le pasan y hace la conexion con la base de datos
4. routes.ts  -> Le dice que archivos de rutas va a usar, si hay mas tablas se crean mas archivos para usar
5. Se crea un controlador que lo retorna la app despues de crear su respectivo servicio y repositorio
6. El controlador es el que ejecuta los metodos que realizan el trabajo en la base de datos
7. para el caso de getUsers simplemente al hacer la peticion ejectua la peticion en CrudUSerMySQL
8. Si no funciona va al metodo handleError que funciona que crea un error personalizado como con Winston
9. para register, crea una clase llamada registerUserDTO que  toma los parametros del req.body y los transforma en un 
RegisterUserDTO,  de paso verfica que todos los campos existan
10. si se crea el usuario entonces va al caso de uso que crea al usuario
11. El caso de uso manda a service a que cree el usuario
12. Si se crea el  usuario entonces 


