# Spotify tracks suggestion by city weather (temperature)

This microservice is able to solve challenge described in: [github:ifood/ifood-backend-advanced-test](https://github.com/ifood/ifood-backend-advanced-test)

## Requirements to run

- Docker suggestion: [Community edition](https://www.docker.com/products/docker-desktop)
- Spotify account [register](https://www.spotify.com/br/signup/)
- Spotify access token [generate test token](https://developer.spotify.com/console/get-search-item/)
  

## Setup

All you need to run this application is to follow the requirements, clone/copy this repository and start the docker container:

```
$ cd /downloaded/repository/folder
$ docker-compose up
```

** Remember to change the path `/downloaded/repository/folder` to respective directory where you've downloaded this repository.

When the console show message like `Webserver running on port 3000.` your setup is finished and you only need to access the api endpoint to test.

- [track by lat/long](http://localhost:3000/tracks-suggestion?lat=-3.73&lon=-38.52)
- [track by city name](http://localhost:3000/tracks-suggestion?city=campinas)

## Architecture/Request Flow

### Why nodejs?
To keep simple and fast, and if you want to easily put the microservice as a serveless service like AWS Lambda.

### Why have used a cache?
To server a world class users the best choice is using a cache system, to prevent unecessary processing, whe is possible to serve content that was previous executed.

### Why Redis?
I decided to use Redis for convenience, but is possible to replace to another easily, but this is a reliable key/value datastorage in memory.

### Why https module?
To make the https request I decided to use the nodejs native https module, to reduce the project class overload, and quickly change the docker containerized to a serverless service.

## Flow 
The flow of this microservice is explained below:

1. When user access our API endpoint, the service check in cache if has the content cached (to prevent consuming http/s requests and keep the response fastest)
2. If content is in cache, then server return the cached content, else, continue to http request and collect the content and write to cache server.
3. In the next request for same place, the response is the cached response.

![Design Microservice](https://s3.amazonaws.com/michaelmafort.com/test/design-microservice.png)