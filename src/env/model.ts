export interface ENV {
  SERVER_PORT: number;
  OPENAI_API_KEY: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  MY_JWT_SECRET: string;
  MY_JWT_EXPIRATION: string | number;
}
