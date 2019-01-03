FROM node:11

# Set the working directory to /user/src/app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY . /usr/src/app

RUN npm install

EXPOSE 8000