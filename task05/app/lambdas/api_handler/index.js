const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
  try {
    // Parse the incoming event body from API Gateway
    const requestBody = JSON.parse(event.body);

    // Extract values from the request body
    const principalId = parseInt(requestBody.principalId);
    const content = requestBody.content || {};

    // Create the item to be stored in DynamoDB
    const item = {
      id: uuidv4(),
      principalId: principalId,
      createdAt: new Date().toISOString(),
      body: content,
    };

    // Define the parameters for the DynamoDB put operation
    const params = {
      TableName: "Events",
      Item: item,
    };

    // Store the item in DynamoDB
    await dynamoDB.put(params).promise();

    // Return a successful response with the created event
    return {
      statusCode: 201,
      body: JSON.stringify({
        event: item, // Return the created event
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error inserting item into DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
