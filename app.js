const { extractRequestData } = require("./helpers");

async function defaultWebhook(req, res, settings, triggerControllers) {
  try {
    const { webhookName } = req.params;
    const httpMethod = req.method;

    const data = extractRequestData(req, httpMethod);
    const executionMessage = `generic trigger ${webhookName}`;

    triggerControllers.forEach((trigger) => {
      if (
        trigger.params.webhookName !== webhookName
        || (
          trigger.params.httpMethod !== "any"
          && trigger.params.httpMethod !== httpMethod
        )
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
