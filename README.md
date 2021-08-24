# Personal Space

![](https://img.shields.io/badge/MongoDB-1.0.0-red)
![](https://img.shields.io/badge/Mongoose-5.13.5-%237C0A02)
![](https://img.shields.io/badge/CORS-2.8.5-lightgrey)
![](https://img.shields.io/badge/Jwt-8.5.1-purple)
![](https://img.shields.io/badge/Jest-27.0.6-yellowgreen)
![](https://img.shields.io/badge/React-17.0.2-blue)
![](https://img.shields.io/badge/JavaScript-ES6-yellow)
![](https://img.shields.io/badge/Node.js-v13.14.0-darkgreen)
![](https://img.shields.io/badge/Express-4.17.1-lightgrey)
![](https://img.shields.io/badge/Sass-1.32.8-pink)

## Purpose of the application

Personal Space is an interactive app that lets users customize what space related features they want to see after logging in.

## Installation


- Clone the [Personal Space github repository](https://github.com/CodecoolGlobal/fapi-exam-project-2-general-SpaceSC/tree/main):
  - `git clone https://github.com/SpaceSC/FSAPI-vizsgaremek`

- In the /backend folder copy and paste the .env-template file, rename it to .env, and fill in your data (see comments in file)
   - Obtain OAuth 2.0 credentials at [Google API Console](https://console.cloud.google.com)


## Usage

### As Docker image

- To run docker images you can [Install Docker for your OS](https://docs.docker.com/get-docker/)

- To run docker images on Windows 7 or 8, you can [install](https://devconnected.com/how-to-install-docker-on-windows-7-8-10-home-and-pro/) Docker Toolbox

- Start Docker Desktop (or VirtualBox on Windows 7)

- In the root folder run `docker-compose up` in your terminal or right click on the file and choose this command in your IDE

- Open http://localhost:3000 in the browser to see the client

- Open http://localhost:5000/api/test in the browser to see if the server is running

- Open http://localhost:5000/docs/ in the browser to see swagger endpoint documentation

### Run with Node.js locally (not as docker image)

- You will need [Node.js](https://nodejs.org/en/) installed on your computer.
- Install the frontend and backend dependencies by running `npm install` in the terminal in the /frontend and /backend folders.

- Run tests with `npm run test` in the /backend folder

## Technologies

React  
JavaScript ES6  
Node.js  
Express  
CORS  
Sass  

## License
[MIT](https://choosealicense.com/licenses/mit/)