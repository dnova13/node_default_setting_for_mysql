const express = require('express')
const router = express.Router()
const util = require('util')

const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const fs = require('fs-extra')
const formidable = require('formidable')

async function createDir() {
    const dateDir = moment().format('/YYYY/MM/DD')
    const path = util.format('%s%s', __upload_dir, dateDir)
    if (fs.existsSync(path)) {
        return path
    }

    fs.ensureDirSync(path)
    return path
}

function uploadFile(req, path) {
    return new Promise( (resolve, reject) => {

        const form = new formidable.IncomingForm();
        const files = []

        form.parse(req);

        form.on('fileBegin', function (name, file){
            file.path = util.format('%s/%s', path, uuidv4())
        })

        form.on('file', function (name, file){
            files.push({size: file.size, path: file.path.replace(__upload_dir, ''), name: file.name, type: file.type})
        })

        form.on('end', function() {
            resolve(files)
        })

        form.on('err', function (name, file){
            reject()
        })
    })
}

router.post('/upload', async(req, res) => {
    
    // TODO insert file table
    const out = {}
    const path = await createDir()
    try {
        const finfo = await uploadFile(req, path)
        log.i(finfo)
        out['success'] = true
        out['data'] = {
            item: finfo
            ,total: finfo.length
        }
    } catch (e) {
        log.e(e)
        out['success'] = false
        out['message'] = 'upload failed'
    }

    res.send(out)
})

module.exports = router