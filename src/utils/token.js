import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret"

export const signToken = (data) => {
  return jwt.sign(data, secret);
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};