import jwt  from "jsonwebtoken"


const getToken = (id) => {
    const token = jwt.sign({id:id},process.env.NEXT_PUBLIC_JSON_KEY, {
        expiresIn: "7d"
    })
    return token;
}


export default getToken;