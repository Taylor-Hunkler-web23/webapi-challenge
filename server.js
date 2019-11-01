const express = require('express');
const server = express();
actionsRouter= require('./routes/actionsRouter.js')
projectsRouter=require('./routes/projectsRouter.js')
server.use(express.json());


server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)


server.get('/', (req, res) => {
    res.send(`<h2>Server running</h2>`)
  });


  module.exports = server;
