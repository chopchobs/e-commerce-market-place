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
npm i zod

npm install @radix-ui/themes
npm install @react-oauth/google@latest

npm i react-image-file-resizer
npm i react-icons

npm install react-hook-form zod @hookform/resolvers @zxcvbn-ts/core @zxcvbn-ts/language-common

--------------------------

--------- Deploy DB to https://supabase.com/ ------
1. Login https://supabase.com/
2. .env
        DATABASE_URL = ""
        DIRECT_URL = ""
3. schema.prisma
        datasource db {
        provider  = "postgresql"
        url       = env("DATABASE_URL")
        directUrl = env("DIRECT_URL")
        }

npx prisma generate
---- When update ----
- DATABASE_URL : "?pgbouncer=true&connection_limit=1"
-- Delete migrate about mysql --
npx prisma migrate dev

/* Enjoy */
--------- Deploy Server to Render ------
--------- Deploy Client to Vercel ------
