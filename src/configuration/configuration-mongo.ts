import { registerAs } from "@nestjs/config";

  export default registerAs('mongo', () => ({
    host: process.env.HOST_MONGODB || 'localhost',
      port: process.env.PORT_MONGODB || 27022,
      user: process.env.USER_MONGODB || 'admin',
      password: process.env.PASSWORD_MONGODB || '123456',
      database: process.env.DATABASE_MONGODB || 'auth-nestjs',
  }));