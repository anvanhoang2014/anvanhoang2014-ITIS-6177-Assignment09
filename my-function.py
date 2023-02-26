import json

def lambda_handler(event, context):
    keyword = event['queryStringParameters']['keyword']
    response_body = f"An Hoang says {keyword}"
    headers = {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
    }
    return {
            'statusCode': 200,
            'body': response_body,
            'headers': headers
    }