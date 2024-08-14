exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 201,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
