import { pool } from '../db';
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../../config/index";
import { log } from 'console';

const getData = (req, res, authHeader) => {
    const cookie = authHeader.split("=")[1]; 
    jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
        err && res.status(401).send("This session has expired. Please login again");
        const { personnel_code } = decoded; // get user id from the decoded token 
        await pool.query('SELECT * FROM users WHERE personnel_code = $1',
            [personnel_code],async (error, results) => {

                error && res.status(500).send("DB error") 
                const user = results.rows[0]   
                const { password, ...data } = user._doc; // return user object without the password
                req.user = data; // put the data object into req.user
            });
        }); 
    }
export const verify = async (req, res, next) => {
   
        const authHeader = req.headers["cookies"]; // get the session cookie from request header
        // console.log(`cookies ${req.header("cookie")}`)
        // console.log(`sessionID ${req.header("sessionID")}`)
        // console.log(`header ${req.header("referer")}`)
        // console.log(`res ${res.headers}`)
        console.log(`req ${JSON.stringify(req.headers)}`)
        !authHeader ?
            res.status(401).send("Unauthorized") :
            getData(req, res, authHeader);

        next();
                    
}