------------Client--------------
npm create vite@latest

>cd client
>npm install
>npm run dev

npm i react-router-dom
npm install sonner
npm install zustand
npm install lucide-react
npm install sweetalert2
npm i rc-slider
npm i lodash
npm npm i numeral
npm install moment
npm install motion

npm install @radix-ui/themes
npm install @react-oauth/google@latest

npm i react-image-file-resizer
npm i react-icons

npm install react-hook-form zod @hookform/resolvers @zxcvbn-ts/core @zxcvbn-ts/language-common

--------------------------

--------- Deploy DB to Supabase ------
1. Login Supabase
2. .env
        DATABASE_URL = ""
        DIRECT_URL = ""
3. schema.prisma
        datasource db {
        provider  = "postgresql"
        url       = env("DATABASE_URL")
        directUrl = env("DIRECT_URL")
        }

npx prisma db push

----When update ----
- DATABASE_URL : "?pgbouncer=true&connection_limit=1"
npx prisma db push


/* Enjoy */
--------- Deploy Server to Vercel ------
1. create vercel.json

{
    "version": 2,
    "name": "roitai",
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "server.js",
        "headers": {
          "Access-Control-Allow-Origin": "*"
        }
      }
    ]
  }

2. package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server",
    "postinstall": "prisma generate"
  },
  

  git init
  git add . 
  git commit -m "init"
  git push..........

3. add project to vercel
3.1 in build command
npx prisma generate
3.2 add env
/* Enjoy */




--------- Deploy Client to Vercel ------
1. create vercel.json

{
    "routes":[
        {
            "src":"/[^.]+",
            "dest":"/"
        }
    ]
}

2. git init
3. git add .
4. git commit -m "init"

5. add project to vercel 
/* Enjoy */