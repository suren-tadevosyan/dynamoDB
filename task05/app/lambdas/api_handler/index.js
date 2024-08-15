const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.target_table || "Events";

exports.handler = async (event) => {
  const eventId = uuidv4();
  const createdAt = new Date().toISOString();

  const params = {
    TableName: tableName,
    Item: {
      id: eventId,
      principalId: event.principalId,
      createdAt: createdAt,
      body: event.content,
    },
  };

  try {
    await docClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        event: {
          id: eventId,
          principalId: event.principalId,
          createdAt: createdAt,
          body: event.content,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not save event to DynamoDB",
      }),
    };
  }
};
