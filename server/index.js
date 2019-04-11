const path = require('path');
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000
const publicPath = path.join(__dirname, '..', 'public')
const indexPath = path.join(publicPath, 'index.html')

app.use(express.static(publicPath))
app.get('*', (req, res) => {
    res.sendFile(indexPath);
})

app.listen(PORT, () => {
    console.log(`The server is listening on PORT: ${PORT}`)
})