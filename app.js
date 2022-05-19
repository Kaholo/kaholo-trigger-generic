function extractRequestData(req) {
  let data = null;

  switch (req.headers["content-type"]) {
    case "application/json":
    case "application/x-www-form-urlencoded":
      data = req.body;
      break;

    default:
      throw new Error(`Unsupported 'content-type' header. Received: ${req.headers["content-type"]}`);
  }

  return data;
}

async function defaultWebhook(req, res, settings, triggerControllers) {
  try {
    const { webhookName } = req.params;
    const httpMethod = req.method;

    const data = extractRequestData(req);
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

module.exports = {
  defaultWebhook,
};
