### How to run this project
First, clone the GitHub repository into a local folder. After that, you can run the project in three different ways.
```
$ git clone https://github.com/joesabido/watersmart.git
```
The project has been tested using Google Chrome.
### Method #1: Running with a local install of NodeJS
The project was built using the current LTS version of NodeJS (10.5.0) and therefore it's recommended to use the same version. Make sure port 8080 is available.
```
$ npm install
$ npm start
```
The project will be available at: http://localhost:8080
### Method #2: Running with Docker
The project includes its own Dockerized NodeJS environment. Docker and DockerCompose are required to run with this method. Make sure port 8080 is available.
```
$ docker-compose build
$ docker-compose up
```
The project will be available at: http://localhost:8080
### Method #3: If it all fails, use the included build
Open the dist/index.html file in a browser.

### Building from source
If desired, the dist bundle can be rebuilt using the following command.
```
$ npm run build
```