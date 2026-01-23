----------- Server ---------------
npm init -y
npm install express morgan cors nodemon 
bcryptjs jsonwebtoken // Email, Password - token

npm i cloudinary
https://console.cloudinary.com/app/c-e15fd94742aea736f2d9b07ac3aefd/image/getting-started
-------------------------
MySQL
prisma

npm install prisma
npx prisma init
npm install @prisma/client

// Doc ใช้ในการสร้างและอัพเดตฐานข้อมูล
npx prisma migrate dev --name ecom
-------------------------


// update Scheme
npx prisma db push   // no log
npx prisma migrate dev --create-only
npx prisma migrate dev --name ecom


//
อัพเดต Prisma schema
npx prisma migrate dev

------------ Client --------------
npm create vite@latest .
- client
- javascript

>cd client
>npm install
>npm run dev

npm install axios

--------------------------
MySQL
prisma

-----------Server---------------
npm init -y
npm install express mongoose morgan body-parser cors nodemon socket.io
npm install google-auth-library

------------Client--------------
npm create vite@latest
- client
- javascript

>cd client
>npm install
>npm run dev

npm install @radix-ui/themes
npm i zustand axios
npm i react-router-dom
npm install @react-oauth/google@latest

npm i react-image-file-resizer
npm i react-toastify
npm i react-icons
npm i lucide-react
npm i lodash
npm i rc-slider
npm i numeral
npm install moment

npm install react-hook-form zod @hookform/resolvers zxcvbn

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
--------- Deploy Server to Render ------



--------- Deploy Client to Vercel ------

/* Enjoy */