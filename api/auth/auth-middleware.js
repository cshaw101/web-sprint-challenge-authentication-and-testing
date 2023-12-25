

const checkUsernameExistsAlready = async (req, res, next) => {

}



/**
 * middleware to make:
 * chackUserameAndPassword: check to make sure a username and password is provided. if not provided then an error with a message of "username and password required" should be provided 
 * checkUsernameExists: checks to make sure the username is not already in the database
 * checkUsernameExistsAlready: checks to see if the username is already in the system and if it is checks to make sure the password matches or gives message of "invalid credentials"
 */


module.exports = {
    checkUsernameExistsAlready
}