const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./src/router/router');
const errorHandler = require('./src/middleware/errorHandler')
const userRouter = require('./src/router/userRouter')

app.use(express.json())

app.use('/user', userRouter)
app.use('/', router);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})