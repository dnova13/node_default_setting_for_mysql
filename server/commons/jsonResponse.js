let jsonResponse = {};

jsonResponse.success = true;
jsonResponse.message = "";
jsonResponse.data = null;
jsonResponse.code = "";
jsonResponse.total = 0;


jsonResponse.successGet = (_data) => {
    this.success = true;
    this.code = 1000;
    this.total = 0;
    this.message = "success";
    this.data = _data;

    return this;
}

jsonResponse.successPost = (_data) => {
    this.success = true;
    this.code = 1000;
    this.total = 0;
    this.message = "success";
    this.data = _data;

    return this;
}


jsonResponse.emptyData = () => {
    this.success = false;
    this.code = 1001;
    this.total = 0;
    this.message = "invalid data";

    return this;
}

jsonResponse.invalidData = () => {
    this.success = false;
    this.code = 1002;
    this.total = 0;
    this.message = "invalid data";

    return this;
}

module.exports = jsonResponse