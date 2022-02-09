import * as dotenv from 'dotenv'
dotenv.config()


export const config = {
    database: {
        dbName: process.env.DB_NAME as string,
        dbUser: process.env.DB_USER as string,
        dbPassWord: process.env.DB_PASS as string,
        dbHost: process.env.DB_HOST as string,
        dbPort: process.env.DB_PORT as string,
    }
}
