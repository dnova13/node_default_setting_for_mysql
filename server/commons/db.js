function DB(pool) {
    if (!(this instanceof DB)) {
        return new DB(pool);
    }

    this.pool = pool

    this.pool.config.connectionConfig.queryFormat = function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g, function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
            }
            return txt;
        }.bind(this));
    };
}

DB.prototype.qry = function (qry, params) {
    return new Promise((resolve, reject) => {
        if (!this.pool) {
            _log.e("not found db pool")
            let res = {success: false}
            //reject(new Error("db conn error"))
            resolv(res)
            return
        }

        this.pool.getConnection((err, conn) => {

            if (err) {
                _log.e(err.stack)
                if (conn && conn.hasOwnProperty('release')) conn.release()
                let res = {success: false}
                //reject(new Error("db conn error"))
                resolv(res)
                return
            }

            conn.query(qry, params, (e, r, f) => {
                let res = {}
                if (e) {
                    _log.e(e.stack)
                    res = e
                    res['success'] = false
                    conn.release()
                    resolve(res)
                    return
                }

                res['success'] = true
                res['rows'] = r
                conn.release()
                resolve(res)
            })
        })
    })
}

module.exports = DB