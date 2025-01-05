var jwt  = require("jsonwebtoken");

const JWT_SECRET = 'asdfghjkl';

export function encode(payload: any) {

 return jwt.sign(payload, JWT_SECRET);
}

export function decode(token: any) {
    
 return jwt.verify(token, JWT_SECRET);
}