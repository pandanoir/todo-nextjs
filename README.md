https://auth0.com/docs/quickstart/webapp/nextjs#install-the-auth0-next-js-sdk を参考に auth0 を入れている

## Set up

```
echo DATABASE_URL='mysql://root:root@127.0.0.1:13306/todo-nextjs' >> .env.local
```

ローカルデータベースに対する操作は dotenv を使うとよい

```
dotenv -e .env.local npx prisma migrate dev
dotenv -e .env.local npx prisma studio
```

## Getting Started

```bash
npm run dev
# or
yarn dev
```

[http://localhost:3000](http://localhost:3000) にページが表示される。

