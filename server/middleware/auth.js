import jwt from "jsonwebtoken";

const secret = "test";
//Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    //Verifica token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      //Id utente viene estratto dal token e assegnato a userId
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }
    //Viene passato il controllo al middleware successivo
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
