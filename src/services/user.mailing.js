const Mailer = require("../services/mailer");

exports.sendWeelcomeEmail = async (name, pass, email) => {
    const text = `Hello ${name}
      
    you have been registered as a Phonizy Admine  user by an administrator.
    
    This e-mail contains your username and password to connect to http://www.phonizyadmine.com/.
      
    To access the site, you must use these parameters:
        - login: ${email}
        - password: ${pass}
    
    This message is automatically generated for your information. Please do not answer it.
        
    Best regards.
    ____________________________________
    Phonizy Admine team .
    E-mail : info@phonizy.com
    Tel : 000 000 000   
    Adress : ...............
    `
    await Mailer.sendEmail(email, "Weelcome to Phonizy Admin", text);
}

exports.sendConfirmationAccount = async (targetuser, verificationlink) => {

    const text = `${new Date().toDateString()}
  Hi ${targetuser.firstName} ${targetuser.lastName},
  
  Welcome to Phonizy!
  
  To start using Phonizy, please verify your email by clicking the following link:
  ${verificationlink}
  
  Thanks!
  The Phonizy team 
  ____________________________________
  Phonizy team .
  E-mail : info@phonizy.com
  Tel : 000 000 000   
  Adress : ...............
  `
    await Mailer.sendEmail(targetuser.email, 'Please verify your account.', text);
}