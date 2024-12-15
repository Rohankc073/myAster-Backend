const express = require('express');
const {getData,postData, getById} = require('../controller/patientController');



const router = express.Router();

router.post('/add',postData);
router.get('/get',getData);
router.get('/getById/:id', getById);

module.exports = router;