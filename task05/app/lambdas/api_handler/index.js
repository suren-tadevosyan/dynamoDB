const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
  try {
    // Construct the item to be inserted into DynamoDB
    const item = {
      id: uuidv4(), // UUID v4 for unique identifier
      principalId: parseInt(event.principalId), // Assuming principalId is passed in the event and is an integer
      createdAt: new Date().toISOString(), // ISO 8601 formatted string
      body: event.body || {}, // Assuming body is passed in the event as a map (JSON object)
    };

    // Parameters for DynamoDB put operation
    const params = {
      TableName: "Events", // Replace with your DynamoDB table name
      Item: item,
    };

    // Insert item into DynamoDB
    await dynamoDB.put(params).promise();

    // Return success response
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Resource created successfully",
        item: item, // Optionally include the item in the response
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
