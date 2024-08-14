exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));

  if (event.Records && Array.isArray(event.Records)) {
    event.Records.forEach((record) => {
      logDynamoDBRecord(record);
    });
  } else {
    console.error("No records found in event.");
  }
};

const logDynamoDBRecord = (record) => {
  console.log(record.eventID);
  console.log(record.eventName);
  console.log(`DynamoDB Record: ${JSON.stringify(record.dynamodb)}`);
};
