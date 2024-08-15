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
    const data = await docClient.put(params).promise();

    const res = {
      statusCode: 201,
      event: {
        id: eventId,
        principalId: event.principalId,
        createdAt: createdAt,
        body: event.content,
      },
    };

    return res;
  } catch (error) {
    return JSON.stringify({
      statusCode: 500,
      message: "Could not save event to DynamoDB",
    });
  }
};
