_**Setup Guide**
This Project contains following services and folders:

_**api-server:**_ HTTP API Server for REST API's

_**build-server:**_ Docker Image code which clones, builds and pushes the build to S3

_**s3-reverse-proxy:**_ Reverse Proxy the subdomains and domains to s3 bucket static assets

_**Local Setup**_

Run npm install in all the 3 services i.e. api-server, build-server and s3-reverse-proxy

Docker build the build-server and push the image to AWS ECR.

Setup the api-server by providing all the required config such as TASK ARN and CLUSTER arn.

Run node index.js in api-server and s3-reverse-proxy

**At this point following services would be up and running:**

**S.No	Service	PORT**

+	api-server: 9000
+	socket.io-server: 9002
+	s3-reverse-proxy: 8000
![diagram-export-7-27-2024-2_07_43-PM](https://github.com/user-attachments/assets/ff180110-2e97-4dc4-98db-f1f0d2e72036)

