# kaholo-trigger-generic
Generic webhook trigger for Kaholo

## How to use:
1. Install the trigger in Kaholo Platform
1. Select the default webhook method
1. Specify the Webhook name, which should be unique among all the Generic Triggers
1. Send a POST request to the endpoint parametrized with the specified name

## Default webhook:
Default webhook triggering any assigned pipeline, and passing received data to it. Acceps x-www-form-encoded and JSON data.

### Webhook URL:
**{KAHOLO_URL}/webhook/generic/{WEBHOOK_NAME}**

### Parameters:
* Webhook name (string) - Webhook's name used to differentiate it from other generic webhooks.