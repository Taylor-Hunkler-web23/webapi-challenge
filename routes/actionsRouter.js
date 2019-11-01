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

module.exports = router;