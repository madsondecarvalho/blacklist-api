import app from './app'

app.listen(3000, async () => {
    console.log(`blacklist-api is running at port '${process.env.SERVER_PORT}'`)
})

