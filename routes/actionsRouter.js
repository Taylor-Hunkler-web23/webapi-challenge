const express = require('express');
const actiondb = require('../data/helpers/actionModel.js');
const router = express.Router();

//returns list of actions
router.get('/', (req, res) => {
    actiondb.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'The action information could not be retrieved'
            })
        })
});


//returns action with specified id
router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    actiondb.get(id)
        .then(action => {

            res.status(200).json(action);

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'The action information could not be retrieved'
            })
        })


});

//Delete action
router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    actiondb.remove(id)

        .then(action => {
           
                res.status(200).json({ message: 'Deleted' });

          
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The action could not be removed" })
        })
})


// POST action
router.post('/', validateUser, (req, res) => {

const action = req.body

    actiondb.insert(req.body)

        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while saving the action to the database" })
        })

})


// //custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    actiondb.get(id)
        .then(user => {
            if (user) {

                next()
            } else {
                res.status(404).json({ message: "invalid user id" })
            }
        })

};


function validateUser(req, res, next) {
    const  action  = req.body;
    if (!action.description) {
        return res.status(400).json({ message: "missing required description field" })
    }

  else {
        next()
    }


};


module.exports = router;