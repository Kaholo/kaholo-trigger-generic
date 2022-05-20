const PAYLOAD_HTTP_METHODS = [
  "PUT",
  "POST",
  "PATCH"
];

async function defaultWebhook(req, res, settings, triggerControllers) {
  try {
    const { webhookName } = req.params;
    const httpMethod = req.method;

    const data = extractRequestData(req, httpMethod);
    const executionMessage = `generic trigger ${webhookName}`;

    triggerControllers.forEach((trigger) => {
      if (
        trigger.params.webhookName !== webhookName ||
        trigger.params.httpMethod !== httpMethod
      ) {
        return;
      }

      trigger.execute(executionMessage, data);
    });

    res.status(200).send("OK");
  } catch (error) {
    res.status(422).send(error.message);
  }

  return Promise.resolve();
}

function extractRequestData(req, httpMethod) {
  if (PAYLOAD_HTTP_METHODS.includes(httpMethod)) {
    return extractDataFromReqBody(req);
  } else {
    return req.query;
  }
}

function extractDataFromReqBody(req) {
  switch (req.headers["content-type"]) {
    case "application/json":
    case "application/x-www-form-urlencoded":
      return req.body;
      break;

    default:
      throw new Error(`Unsupported 'content-type' header. Received: ${req.headers["content-type"]}`);
  }
}

module.exports = {
  defaultWebhook,
};
