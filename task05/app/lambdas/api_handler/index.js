exports.handler = async (event) => {
  // Your logic here

  return {
    statusCode: 201, // Ensure this is set to 201
    body: JSON.stringify({
      message: "Resource created successfully",
      // Any additional response fields
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
