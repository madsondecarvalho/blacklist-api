declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string,
        PORT: string,
        DB_HOST: string,
        DB_USER: string,
        DB_PASS: string,
        DB_NAME: string,
        DB_PORT: string,
    }
}