


# chapter 2 

## authantication 

- npm i prisma 
- npm i @prisma/client
- npx prisma init 
          prisma.schema : file

docker run --name my-postgres -e POSTGRES_USER=myuser -e 
POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres

# prisma client initiate
   src->libs->db.js

    prisma->prisma.schema
    User model created
     - npx prisma generate
    src->libs->db.js

     - npx prisma migrate dev
             name : usermodel
     - npx prisma db push

## authantication started
   - src -> routes->auth.routes.js
      # constroller started 
        - src->controllers-> auth.controller.js 
           - npm i bcryptjs
           - npm i jsonwebtoken cookie-parser
           $ opnessl rand -hex 32
         - src-index.js
           [ cookies relates task]

## middleware started
   - src-> middleware -> auth.middleware.js

##Problem created model 
  - schema.prisma

## setup the jusdge0 

## Problem Routes 
  - src-> index.js
     app.use("/api/v1/problems",problemRoutes)
  - src->routes->problems.routes.js
         checkAdmin : created
         controller
           - src-> controllers-> problem.controller.js

     










# Prisma cmd 

Examples

      Set up a new Prisma project
      $ npx prisma init

      Generate artifacts (e.g. Prisma Client)   
      $ npx prisma generate

      Browse your data
      $ npx prisma studio

      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
      $ npx prisma migrate dev

      Pull the schema from an existing database, updating the Prisma schema
      $ npx prisma db pull

      Push the Prisma schema state to the database
      $npx prisma db push

      Validate your Prisma schema
      $ npx prisma validate

      Format your Prisma schema
      $ npx prisma format

      Display Prisma version info
      $ npx prisma version

      Display Prisma debug info
      $ npx prisma debug