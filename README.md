# blog-express-sqlite
Es necesario instalar de Global los siguiente paquetes
npm i -g nodemon ts-node
Crear una una carpeta ejemplo "Miprimerapi", ingresar a la carpeta cd Miprimerapi iniciar repositorio con github
1- iniciamos el repositorio npm

npm init --yes
2 instalamos express

npm install express
3 instalamos typescript y los types de express

npm i -D typescript @types/express @types/node
4 Creamos el archivo tsconfig.conf
npx tsc --init

5 Creamos el archivo .gitignore
node_modules
dist
6 Agregamos dos scripts en el archivo package.json

	"scripts": {
	"build": "npx tsc",
	"start": "node dist/index.js",
	"dev": "nodemon server.ts"
    }
8 Modificar archivo tsconfig.json descomentado la linea "outDir": "./" y agregando la carpeta dist "outDir": "./dist"

Ejecutar APP
Clonar repositorio y correr el comando

npm install
npm build
npm start

npm run dev

9 npm i typeorm sqlite3

10 En tsconfig.json descomentar:

"experimentalDecorators": true,       Habilitamos decoradores          
"emitDecoratorMetadata": true,   
"strictPropertyInitialization": false,   Cambiar en false para que me deje crear una clase sin constructor

11 Creamos la carpeta modules/noticias
/noticia.entity.ts
/noticia.routes.ts
/noticia.service.ts
/noticia.interface.ts

12 Instalar npm i uuid

13 Creamos dentro de Modules la carpeta db
db/dbcontext.ts

14 Abrimos Heidi
Nuevo, MQlite, en el nombre d ela base traer el archivo blog.db


