// (engine x) ka bhi use kr skte h pr hume dynamic chize chiye to node js use kr rhe  

const express = require('express')
const httpProxy = require('http-proxy')

const app = express()
const PORT = 8000 // by default it work on port 80

const BASE_PATH = 'https://vercels-clones.s3.ap-south-1.amazonaws.com/__outputs' //its a buket name


const proxy = httpProxy.createProxy() //it create proxy

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];//a1.localhost.8000

    // Custom Domain - DB Query

    const resolvesTo = `${BASE_PATH}/${subdomain}`

    return proxy.web(req, res, { target: resolvesTo, changeOrigin: true })// proxy server 

})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/') // if u doesn't give any name then it automatically goes to index.html page
        proxyReq.path += 'index.html'

})

app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`))