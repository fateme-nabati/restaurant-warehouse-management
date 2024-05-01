import { pool } from '../../../db';
import bcrypt from 'bcrypt';
import { login } from './login';
export const loginReq = async (req, res) => {
  const { username, password } = req.body;
  
  let existingUser: {
    personnel_code;
    national_code;
    first_name;
    last_name;
    birth_date;
    phone_number;
    password;
  };

  await pool.query(
    'SELECT * FROM users WHERE personnel_code = $1',
    [username],
    async (error, results) => {

      existingUser = results.rows[0]   

      error ?
        res.status(403).send("error") : 
        !existingUser ?
          res.status(403).send('Invalid username!') :     
          !await bcrypt.compare(password, existingUser.password) ?
            res.status(403).send("Invalid password!") :   
            login(req, res, existingUser)
     
    //   console.log(
    //  `existingUser -> ${existingUser} existingUserType -> ${typeof existingUser}`
    //  );
    }
  );
};

module.exports = { loginReq };
