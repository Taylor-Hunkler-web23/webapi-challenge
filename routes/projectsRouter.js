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

// POST project
router.post('/', validateUser, (req, res) => {

    const project = req.body
    
        projectDB.insert(req.body)
    
            .then(project => {
                res.status(201).json(project);
            })
            .catch(err => {
                console.log('error', err);
                res.status(500).json({ error: "There was an error while saving the project to the database" })
            })
    
    })

    //Delete project
router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    projectDB.remove(id)

        .then(project => {
           
                res.status(200).json({ message: 'Deleted' });

          
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The project could not be removed" })
        })
})

//returns project with specified id
router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    projectDB.get(id)
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

//returns project with specified id
router.get('/:id/actions', validateUserId, validateAction, (req, res) => {
    const id = req.params.id;
    projectDB.getProjectActions(id)
        .then(project => {

            res.status(200).json(project);

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'The project action information could not be retrieved'
            })
        })


});

//Update action
router.put('/:id', validateUserId, validateUser, (req, res) => {
    const id = req.params.id;
    const { body } = req;




    projectDB.update(id, body)

        .then(project => {

            res.status(200).json(project);


        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while updating the project to the database" })
        })


});


    //Middleware

    function validateUser(req, res, next) {
        const  action  = req.body;
        if (!action.description || !action.name) {
            return res.status(400).json({ message: "missing required description or name field" })
        }
    
      else {
            next()
        }
    
    
    };


    
function validateUserId(req, res, next) {
    const { id } = req.params;
    projectDB.get(id)
        .then(user => {
            if (user) {

                next()
            } else {
                res.status(404).json({ message: "invalid project id" })
            }
        })

};

function validateAction(req, res, next) {
    const { id } = req.params;
    projectDB.getProjectActions(id)
       

    .then(actions => {
        if (actions.length === 0) {
            res.status(404).json({ message: "There is no actions for that project" })
        } else {
            next()
        }
    })

        

};


module.exports = router;