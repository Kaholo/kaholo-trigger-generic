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
      return tryJSONParse(req.body);

    default:
      throw new Error(`Unsupported 'content-type' header. Received: ${req.headers["content-type"]}`);
  }
}

function tryJSONParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

module.exports = {
  extractRequestData,
  extractDataFromReqBody,
};
