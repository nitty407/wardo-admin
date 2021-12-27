FROM node:14.7.0

# Create app directory
WORKDIR /app/

# Install app dependencies
RUN npm -g install serve

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY *.json /app/
COPY *.lock /app/

RUN yarn install

# Bundle app source
COPY . /app/

#Build react/vue/angular bundle static files
ARG profile
ENV PROFILE_OPTS=$profile
ENV NODE_OPTIONS="--max-old-space-size=6000"

RUN yarn run $PROFILE_OPTS

EXPOSE 3000
# serve build folder on port 3000
CMD ["serve", "-s", "build", "-p", "3000"]