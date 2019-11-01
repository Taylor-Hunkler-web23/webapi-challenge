const express = require('express');
const projectDB = require('../data/helpers/projectModel.js');
const router = express.Router();


//returns list of projects
router.get('/', (req, res) => {
    projectDB.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'The project information could not be retrieved'
            })
        })
});


module.exports = router;