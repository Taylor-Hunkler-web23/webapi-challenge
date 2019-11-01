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




module.exports = router;