let express = require('express')
const http = require('http')
const app = express()
const httpServer = http.createServer(app)
const qrcode = require('qrcode')
const { resizeImage } = require('./lib/function') 
global.qr = ' '

app.set('json spaces', 2);
app.use(express.json());
app.get('/', async (req, res, next) => {
    try {
        res.setHeader("content-type", "image/png")
        res.send(await resizeImage(await qrcode.toBuffer(global.qr), 512, 512))
    } catch (error) {
        res.send('err, ' + error.message)
    }
})

const qrPrint = (qr) => {
    app.get('/', async (req, res) => {
        res.setHeader("content-type", "image/png")
        res.send(await resizeImage(await qrcode.toBuffer(qr), 512, 512))
    })
}

// Run the server
const PORT = 3000
httpServer.listen(PORT, () => {
    console.log('[INFO] Web api Server on port ' + PORT)
})
