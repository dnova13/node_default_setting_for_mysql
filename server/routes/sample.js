import jr from "../commons/util";

const express = require('express')
const router = express.Router();


router.get('/sample', async(req, res) =>{
    let out = {}
    let sql
    let sqlP
    let result

    sql = `SELECT id, title, content, view_count, user_id, close_chk 
            FROM post 
            WHERE id=1`
    sqlP = null
    result = await db.qry(sql, sqlP)

    console.log(result);
    // console.log(jr.emptyData);

    if (!result['success']) {
        out['success'] = false
        out['message'] = 'something broke'
        out['data'] = {"success": false, "message": "failed", "item": [], "item_length": 0}
        res.json(out)
        return
    }

    if (result['rows'].length < 1) {
        out['success'] = true
        out['message'] = 'success'
        out['data'] = {
            success: false
            ,message: 'empty'
            ,item: []
            ,item_length: 0
        }
        res.json(out)
        return
    }

    out['success'] = true
    out['message'] = 'success'
    out['data'] = {
        success: true
        ,message: 'success'
        ,item: result['rows']
        ,item_length: result['rows'].length
    }

    res.json(out)
})

module.exports = router