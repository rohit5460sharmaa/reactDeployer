const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')

const Redis = require('ioredis')
require('dotenv').config({ path: '../.env' });

const publisher = new Redis(process.env.REDIS_URL)

 //we make s3 client 
const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})
//# Project_id to uniquly identify the project

const PROJECT_ID = process.env.PROJECT_ID


function publishLog(log) {
    publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }))
}


async function init() {
    console.log('Executing script.js')
    publishLog('Build Started...')
    const outDirPath = path.join(__dirname, 'output')// give directory name 

    const p = exec(`cd ${outDirPath} && npm install && npm run build`)// it goes to directory(output) and install and build dict folder in which we have static file 

    // when we run above command p then below help the track of the outputs and errors
    p.stdout.on('data', function (data) {
        console.log(data.toString())
        publishLog(data.toString())
    })
    
    //error
    p.stdout.on('error', function (data) {
        console.log('Error', data.toString())
        publishLog(`error: ${data.toString()}`)
    })

    p.on('close', async function () {
        console.log('Build Complete')
        const distFolderPath = path.join(__dirname, 'output', 'dist')// output se dist folder m jana h where we store static files like index.html,css file etc
        const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true })// it give all files and folder in the form of array

    

    for (const file of distFolderContents) {
        const filePath = path.join(distFolderPath, file)//when we upload on s3 bucket we always upload files instead of folder
        if (fs.lstatSync(filePath).isDirectory()) continue;// if it is folder then continue else if it is file then upload on S3

        console.log('uploading', filePath)

        const command = new PutObjectCommand({
            Bucket: 'vercels-clones',// buket name create at aws s3 with policy
            Key: `__outputs/${PROJECT_ID}/${file}`,// project id and key
            Body: fs.createReadStream(filePath),// file's body that what is the code 
            ContentType: mime.lookup(filePath)// type i.e (html, js, img) so it is dynamic type for this we use mime-type(when ever give the path it return the type)
        })
        

        await s3Client.send(command)// with this my (object or command) upload hone start ho jenge on S3 bucket p
        publishLog(`uploaded ${file}`)
        console.log('uploaded', filePath)
    }

        console.log('Done...')
    

    })
    
}
init()

//in this node run and project build and upload it onto S3 basically we stream it