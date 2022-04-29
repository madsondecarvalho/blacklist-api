import express, { Router, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { routes } from './routes'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { config } from './config/config'
import Blacklist from "./schemas/Blacklist"

dotenv.config()

class App {
    public express: express.Application
    public numberOfRequests: number = 0

    public constructor() {
        this.express = express()
        this.middlewares()
        this.routes()
        this.database()
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            this.numberOfRequests++
            next()
        })
    }

    private statusRoute(): void {
        const router = express.Router();

        router.get('/status', async (req: Request, res: Response) => {
            const data = {
                uptime: Math.floor(process.uptime()),
                HowManyInBlacklist: await Blacklist.countDocuments(),
                numberOfRequests: this.numberOfRequests,
                date: new Date(),
            }

            res.status(200).send(data);
        });

        this.express.use(router)
    }

    private routes(): void {
        this.express.use(routes)
        this.statusRoute()
    }

    public async database() {
        await mongoose.connect(`mongodb://${config.database.dbUser}:${config.database.dbPassWord}@${config.database.dbHost}:${config.database.dbPort}`)

        mongoose.connection.on('error', () => { console.error('mongodb connection error') })
        mongoose.connection.on('open', () => { console.log('mongodb is connected') })
    }
}

export default new App().express
