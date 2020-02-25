# To start the project locallly
> npm i
> npm run dev
>> On browser, run https://localhost:5003

# To start with docker
> sudo docker build . -t <tag-name>
> sudo docker images
> sudo docker ps
> sudo docker run -it -p <your-port>:<5003> -d <tag-name>
>> On browser, run https://localhost:<your-port>