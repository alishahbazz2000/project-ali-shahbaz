import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const alg = "HS256";
export const generateToken = async (id) => {
  const jwt = await new jose.SignJWT({ id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  return jwt;
};
