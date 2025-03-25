interface EnvType {
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  PORT: string;
}

export const ENV = () =>
  ({
    NODE_ENV: process.env.NODE_ENV || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
    PORT: process.env.PORT || '',
  } as EnvType);
