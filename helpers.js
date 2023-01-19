const PAYLOAD_HTTP_METHODS = [
  "PUT",
  "POST",
  "PATCH",
];

function extractRequestData(req, httpMethod) {
  if (PAYLOAD_HTTP_METHODS.includes(httpMethod)) {
    return extractDataFromReqBody(req);
  }
  return req.query;
}

function extractDataFromReqBody(req) {
  switch (req.headers["content-type"]) {
    case "application/json":
    case "application/x-www-form-urlencoded":
      return req.body;

    default:
      throw new Error(`Unsupported 'content-type' header. Received: ${req.headers["content-type"]}`);
  }
}

module.exports = {
  extractRequestData,
  extractDataFromReqBody,
};
