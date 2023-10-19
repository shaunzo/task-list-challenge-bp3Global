const express = require("express");
const fs = require("fs");
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const app = express();
app.use(cors())
app.use(bodyParser.json({ type: 'application/*+json' }))


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/tasks", cors(corsOptions), (request, response) => {
    fs.readFile('../db/data.json', function(err, data){
        if(err){
            console.info('getting tasks failed: ' + err.message);
            response.status(400).send('failed to read data.json: ' + err.message);
        }
        response.send(JSON.parse(data));
    })
})

app.post("/save-task", cors(corsOptions), jsonParser, (request, response) => {
    const task = request.body;
    if(!task.description || task.description === ""){
        response.status(400).send('bad request - no description');
        return;
    }
    fs.readFile('../db/data.json', function(err, data){
        if(err){
            console.info('read failed');
            response.status(400).send('failed to read data.json: ' + err.message)
        }
        let databaseTasks = JSON.parse(data)
        let highestId = 0;
        databaseTasks.forEach(dbTask => highestId = dbTask.id > highestId ? dbTask.id : highestId)
        task.id = highestId + 1;
        task.status = "incomplete"
        databaseTasks.push(task);
        fs.writeFile('../db/data.json', JSON.stringify(databaseTasks), function (err, data){
            if(err){
                console.info('write failed: ' + err.message);
                response.send(400).send('failed to write to data.json: ' + err.message);
            }
        });
    });

    response.status(200).json(task);
})

app.post("/complete-task", cors(), (request, response) => {
    const taskId = request.query['taskId'];
    if(!taskId || taskId === ""){
        response.status(400).send('bad request, no task id');
        return;
    }
    fs.readFile('../db/data.json', function (err, data) {
        if (err) {
            console.info('read failed: ' + err.message)
            response.status(400).send('failed to read data.json: ' + err.message)
        }
        let databaseTasks = JSON.parse(data)
        databaseTasks.forEach(dbTask => {
            if (Number(dbTask.id) === Number(taskId)) {
                dbTask.status = "complete";
            };
        });
        fs.writeFile('../db/data.json', JSON.stringify(databaseTasks), function (err, data){
            if (err) {
                console.info('update status failed: ' + err.message);
                response.status(400).send('failed to read data.json: ' + err.message);
            }}
        );
    });
    response.status(200).json(data)
})

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});