import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  secretKey: process.env.SECRETKEY_JWT,
  expiresIn: '2h'
}));