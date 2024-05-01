import jwt from 'jsonwebtoken';
import {SECRET_ACCESS_TOKEN} from '../../../../config/index'
// import {SECRET_ACCESS_TOKEN} from '/home/fateme/work/restaurant-warehouse-management/apps/.env'
const generateAccessJWT = function (user) {
    const payload = {
      id: user.personnel_code,
    };
    return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
      expiresIn: '20m',
    });
  };

  const options = {
    maxAge: 20 * 60 * 1000, // would expire in 20minutes
    httpOnly: true, // The cookie is only accessible by the web server
    secure: true,
    sameSite: "None",
  }

  export const login = function (req, res, user) {
    const token = generateAccessJWT(user); 
    res.cookie("SessionID", token, options); // set the token to response header
    // res.status(200).send("Successfull login!");
    res.status(200).json(user);
  };