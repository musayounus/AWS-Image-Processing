# 🖼️ AWS Serverless Image Processing Pipeline

An automated pipeline that analyzes images using AI (Amazon Rekognition), stores results in DynamoDB, and provides a REST API for querying.

![Architecture Diagram](./docs/architecture.png)

## 🔍 Features
- **Automated Image Analysis**: Detects objects/labels in uploaded images
- **Serverless**: 100% AWS serverless components (Lambda, API Gateway, S3)
- **Scalable**: DynamoDB handles high-throughput requests
- **Secure**: IAM roles with least-privilege permissions

## 🛠️ Technologies
| Service          | Use Case                          |
|------------------|-----------------------------------|
| AWS Lambda       | Image processing & API handlers   |
| Amazon Rekognition | AI-powered image analysis        |
| DynamoDB         | Metadata storage                  |
| API Gateway      | REST API endpoint                 |
| S3               | Image storage                     |

## 🚀 Deployment

### Prerequisites
- AWS CLI configured (`aws configure`)
- Node.js 20.x
- [Postman](https://www.postman.com/) (for API testing)

## 1. Infrastructure Setup
chmod +x infrastructure/setup.sh
./infrastructure/setup.sh

## 2. Deploy Lambda Functions
# Image processing Lambda
cd lambdas/image-processing
zip -r function.zip .
aws lambda update-function-code --function-name ImageProcessing --zip-file fileb://function.zip

# API handler Lambda
cd ../api-handler
zip -r function.zip .
aws lambda update-function-code --function-name GetImageAnalysis --zip-file fileb://function.zip

## 🖥️ Usage
# Upload an Image
aws s3 cp test.jpg s3://your-bucket-name/ --acl private

# Query Results via API
curl https://your-api-id.execute-api.region.amazonaws.com/prod/images

# Sample Response:
{
  "ImageId": "test.jpg",
  "Labels": [
    {"Name": "Dog", "Confidence": 98.76},
    {"Name": "Animal", "Confidence": 95.32}
  ]
}

## 📂 Project Structure
aws-image-processing/
├── infrastructure/       # AWS setup scripts
├── lambdas/              # Lambda function code
│   ├── image-processing/ # S3 → Rekognition → DynamoDB
│   └── api-handler/      # API Gateway → DynamoDB
├── postman/              # API test collection
├── docs/                 # Diagrams & documentation
└── README.md             # You are here!

## 🛡️ Security
IAM Roles: Least-privilege permissions

S3 Encryption: Server-side encryption (SSE-S3)

API Gateway: AWS_IAM authorization recommended

## 📈 Monitoring
All services are integrated with:

Amazon CloudWatch (Logs/Metrics)

AWS X-Ray (Request tracing)

## 🤝 Contributing
Fork the project

Create a feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request