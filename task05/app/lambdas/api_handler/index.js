// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

exports.handler = async (event, context) => {
    try {
        console.log(JSON.stringify(event, null, 2));

        // Process each record if applicable
        event.Records.forEach(record => {
            logDynamoDBRecord(record);
        });

        // Return a successful response
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Records processed successfully' }),
        };
    } catch (error) {
        // Handle errors and return an appropriate response
        console.error('Error processing event:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};

const logDynamoDBRecord = (record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log(`DynamoDB Record: ${JSON.stringify(record.dynamodb)}`);
};
