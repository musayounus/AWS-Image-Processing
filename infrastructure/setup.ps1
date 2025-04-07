# infrastructure/setup.ps1

# 1. Create S3 Bucket
aws s3api create-bucket 
  --bucket s3-musa-image-processing 
  --region eu-central-1 
  --create-bucket-configuration LocationConstraint=eu-central-1

# 2. Create DynamoDB Table
aws dynamodb create-table 
  --table-name ImageAnalysisResults 
  --attribute-definitions AttributeName=ImageId,AttributeType=S 
  --key-schema AttributeName=ImageId,KeyType=HASH 
  --billing-mode PAY_PER_REQUEST

# 3. Deploy Lambdas (see lambdas/ for code)
