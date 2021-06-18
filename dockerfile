# base image
FROM node:14

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app

# build app
RUN npm install
COPY . /app

ENTRYPOINT ["/app/sde_test_solution_stdout.sh"]