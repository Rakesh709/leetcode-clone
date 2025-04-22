


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