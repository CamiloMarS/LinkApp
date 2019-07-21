const bcrypt = require('bcryptjs');
const helpers = {};

//Encrypt password --> signup
helpers.encryptPassword = async password => {
    const salt = await bcrypt.genSalt( 10 ); //is a hash
    return await bcrypt.hash( password,salt );
};

//Decrypt password --> login
helpers.decryptPassword = async ( passwordReceived, savedPassword ) => {
     try {
        await bcrypt.compare(passwordReceived, savedPassword);
     }catch(error) {
          console.log("ERROR AL INTENTAR ENCRIPTAR \n", {...error});
     }
}

module.exports = helpers;