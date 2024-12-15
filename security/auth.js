const jwt=require("jsonwebtoken");


function authorization(req, res, next){
    try {
        const token = req?.header('Authorization')?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Unauthorized. No Token!"
            });

        } else {
            try{
                const verified = jwt.verify(token,"hRyJe0Lb1DJSAq8Eaoj7SbjsvFmAjiWU")
                req.user=verified;
                next();                                          
            }catch(e){
                res.status(400).json({
                    message:"Invalid Token"
                });
            }

        }
    } catch(e){
            res.status(400).json({
                message:"Unauthorized"
            });
        }
}

module.exports={authorization}