aws s3 rb s3://s3-musa-image-processing --force
aws dynamodb delete-table --table-name ImageAnalysisResults
