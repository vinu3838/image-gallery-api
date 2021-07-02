module.exports = (req, res, next) => {

    const remoteIp = req.connection.remoteAddress + '://' + req.connection.remotePort;
    console.log(req.method + " Request Made from " + remoteIp + ' for route' + req.originalUrl);

    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
        res.writeHead(200, headers);
        res.end();
    }
    else {
        // eslint-disable-next-line no-undef
        res.header("Access-Control-Allow-Origin", process.env.ALLOWED_CORS_ORIGIN);
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    }
}
