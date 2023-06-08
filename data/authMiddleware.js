const jwt = require('jsonwebtoken')

const APP_SECRET = 'herzafr'
const USERNAME = 'admin'
const PASSWORD = '123qwe'

const mappings = {
    get: ['/api/employees', '/employees'],
}


function requiresAuth(method, url) {
    console.log('datq', url);
    return (mappings[method.toLowerCase()] || [])
        .find(p => url.startsWith(p)) !== undefined;
}

module.exports = (req, res, next) => {
    if (req.url.endsWith("login") && req.method == "POST") {
        if (req.body && req.body.username == USERNAME && req.body.password == PASSWORD) {
            let jwtoken = jwt.sign({ data: USERNAME, expiresIn: '1h' }, APP_SECRET)
            res.json({ success: true, token: jwtoken });
        } else {
            res.json({ success: false });
        }
        res.end()
        return;
    } else if (requiresAuth(req.method, req.url)) {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}