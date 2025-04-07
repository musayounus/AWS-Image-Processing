const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    
    try {
        const rekognitionParams = {
            Image: {
                S3Object: {
                    Bucket: bucket,
                    Name: key
                }
            },
            Features: ['GENERAL_LABELS']
        };
        
        const rekognitionResult = await rekognition.detectLabels(rekognitionParams).promise();
        
        const dbParams = {
            TableName: 'ImageAnalysisResults',
            Item: {
                ImageId: key,
                Bucket: bucket,
                AnalysisDate: new Date().toISOString(),
                Labels: rekognitionResult.Labels,
                Metadata: event.Records[0].s3.object
            }
        };
        
        await dynamodb.put(dbParams).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Image processed successfully' })
        };
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
