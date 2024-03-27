import { pool } from '../../../db';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
  const { username, password } = req.body;
  const personnel_code = parseInt(username)
  // const validate_password = async (user, password) => {

  //     const valid_password = await bcrypt.compare(password, user.password)
  //     return valid_password
  // }
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
    [personnel_code],
    async (error, results) => {

      existingUser = results.rows[0]   

      error ?
        console.log("error") : 
        !existingUser ?
          res.status(403).send('Invalid username!') :     
          !await bcrypt.compare(password, existingUser.password) ?
            res.status(403).send("Invalid password!") :   
            res.status(200).json(existingUser);
     
    //   console.log(
    //  `existingUser -> ${existingUser} existingUserType -> ${typeof existingUser}`
    //  );
    }
  );
};

module.exports = { login };
