import app from './src/index'

const port: string = process.env.PORT || '3000'

app.listen(port, (err?: Error | null) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
