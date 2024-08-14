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

    const correctPathResponse = JSON.stringify({
      statusCode: 201,
      event: item,
    });

    return {
      correctPathResponse,
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
