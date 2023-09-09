FROM node:lts as BUILDER
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src
COPY server.js /app/server.js
RUN npm run prod
RUN npm run clean:prod
RUN npm i --omit=dev
RUN rm -rf .npmrc

FROM node:lts-slim
WORKDIR /app
COPY package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY server.js /app/server.js
CMD ["node", "./server.js"]
EXPOSE 5998