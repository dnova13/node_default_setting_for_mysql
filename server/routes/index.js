const express = require('express')
const router = express.Router();
const jresp = require("../commons/jsonResponse");

const test = require('./sample');
const signin = require('./signin');

router.get('/', async(req, res) => {

    let out = jresp.invalidData();
    res.send(out);
})


router.use('/test', test)
router.use('/signin', signin)

// auth check
//router.use(authCheck)

// router.use('/file', upload)

module.exports = router