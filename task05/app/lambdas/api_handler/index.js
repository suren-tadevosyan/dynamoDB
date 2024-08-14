const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
  try {
    const item = {
      id: uuidv4(),
      principalId: parseInt(event.principalId),
      createdAt: new Date().toISOString(),
      body: event.body || {},
    };

    const params = {
      TableName: "Events",
      Item: item,
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 201, // Ensure statusCode is always returned
      body: JSON.stringify({
        message: "Resource created successfully",
        item: item,
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
