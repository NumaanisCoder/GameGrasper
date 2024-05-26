import jwt  from "jsonwebtoken"


const getEmailToken = (email) => {
    const token = jwt.sign({email:email},process.env.NEXT_PUBLIC_JSON_KEY, {
        expiresIn: "3d"
    })
    return token;
}


export default getEmailToken;