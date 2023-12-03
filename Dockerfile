ARG PORT
FROM node:20 AS Dev
RUN npm i -g pnpm
WORKDIR /app/
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE $PORT
CMD ["pnpm" , "run" , "dev"]