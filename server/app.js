import express from "express"; // babel 의해 변경될 코드
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from 'mysql';
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.id);

const app = express(); // 변수 app을 선언하여 expreess 실행
const port = process.env.PORT || 4001;


// 미들웨어
app.use(helmet()); // 보안을 위해 씀
app.use(cookieParser());

//json을 이해하기 위해 씀
app.use(bodyParser.json());

//서버에 유저로 반은 데이터를 이해하기 위해 씀
app.use(bodyParser.urlencoded({ extended:false }));

// app.use(express.urlencoded( {extended : false} ));
// app.use(express.json())

// log
app.use(morgan("dev"));
app.use(cors());

app.use(function (error, req, res, next) {
    console.log(error)

    if (error instanceof SyntaxError) {
        res.out({'success': false, 'message': 'json parse error'})
    } else {
        next();
    }
});

// app init
// 글로벌 객체 : 전역 지정
// 베이스 경로
global.__base = __dirname + '/'

// 업로드 경토
global.__upload_dir = process.env.UPLOAD_DIR

/// 유틸리티 경로 지정
global._util = require(__base + '/commons/util')

// 라우터 경로 지정.
const router = require(__base + '/routes')

const _db = require(__base + '/commons/db')
const _logger = require(__base + '/commons/logger')
const _jwt = require(__base + '/commons/jwt');


// level: 1 - no output, 2 - default, 3 - info, 4 - warn, 5 - error
const logLevel = process.env.LOG_LEVEL || 5

async function main() {
    global.log = _logger(null, logLevel)

    // log.d('# load logger success')
    global.db = _db(mysql.createPool(
        {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            connectionLimit : process.env.DB_POOL,
            dateStrings: 'date'
        }
    ))
    console.log('# load db success')

    global.jwt = _jwt(process.env.JWT_SECRET)

    // static
    app.use('/', express.static(__dirname + '/../build'))
    console.log('static dir ' + __dirname + '/../build')

    // // 라우터
    // const handleHome = (req, res) => res.send("1111111111111");
    // app.get("/", handleHome);

    app.use('/api', router)
    console.log('# /api route set success')

    // 404
    app.use(function(req, res, next) {
        res.status(404).send({success: false, message: 'not found'});
    });

    // 500
    app.use(function(req, res, next) {
        res.status(500).send({success: false, message: 'something broke'});
    });

    app.listen(port, () => {
        console.log(`Listening on: http://localhost:${port}`);
    })

    /*
        // keep alive
        setInterval(() => {
            log.d('# keep alive')
            db.qry('select 1')
        }, 1000*60*3);
    */
}

main();
