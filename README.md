# Kaholo Generic Webhook Trigger
This plugin provides a generic webhook for the triggering of Kaholo pipelines from other systems.

## How to use:
1. Install the trigger in Kaholo Platform
1. Select the default webhook method
1. Specify the Webhook name, which should be unique among all the Generic Triggers
1. Send an HTTP request to the endpoint, including optional parameter payload (either urlencoded or JSON).

## Configuration
A configuration may be selected but this plugin does not require or use Kaholo Pipeline Configurations.

## Method Basic webhook:
Currently the only method available - this establishes a listening webhook at a specified URL that will trigger a pipeline execution when it receives an HTTP request of the specified type, including the payload if one is provided.

### Webhook URL:
An example URL provided for convenient copy/paste. Substitute ":webhookName" with the actual Webhook Name to get the complete URL.

The URL follows the pattern:
**{KAHOLO_URL}/webhook/generic/{WEBHOOK_NAME}**

### Parameters:
* Webhook name (string) - Webhook's name used to differentiate it from other generic webhooks. Make this long and complex if necessary to avoid brute force or dictionary attacks.

## Triggering Examples
Using curl from command line via ngrok URL:

    curl -d "trigger=curl" -H "Content-Type: application/x-www-form-urlencoded" -X POST https://16bd-2406-3003-2073-164d-25e5-71a9-2199-a24c.ap.ngrok.io/webhook/generic/mytrigger

Using curl from Jenkins pipeline with default content type:

    sh """curl -d 'trigger=jenkins' https://myusername.kaholo.net/webhook/generic/mytrigger"""

Using curl from Jenkins pipeline with JSON content type:

    sh """curl -d '{"trigger": "jenkins"}' -H "Content-Type: application/json" https://myusername.kaholo.net/webhook/generic/mytrigger"""
