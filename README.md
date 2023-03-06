# Kaholo Generic Webhook Trigger
This plugin provides a generic webhook for the triggering of Kaholo pipelines from other systems.

## How to use:
1. Install the trigger in Kaholo Platform
1. Select the Basic Webhook method
1. Specify the Webhook Name, which should be unique among all the Generic Triggers
1. Send an HTTP request to the endpoint, including optional parameter payload (either urlencoded or JSON).

## Configuration
A configuration may be selected but this plugin does not require or use Kaholo Pipeline Configurations. If one is selected the pipeline, when triggered, will execute in that configuration context.

## Method Basic Webhook:
Currently the only method available - this establishes a listening webhook at a specified URL that will trigger a pipeline execution when it receives an HTTP request of the specified type, including the payload if one is provided.

### Webhook URL:
An example URL is provided for convenient copy/paste. Substitute ":webhookName" with the actual Webhook Name to complete the URL. The `:` is not part of the URL.

The URL follows the pattern:
**{KAHOLO_URL}/webhook/generic/{WEBHOOK_NAME}**, for example:

    https://myusername.kaholo.net/webhook/generic/mytrigger

### Parameters:
* HTTP Method - Here you may choose "any" to trigger on any HTTP activity to the endpoint, or you may select a specific method and then only that method will trigger the pipeline execution.
* Webhook name (string) - Webhook's name used to differentiate it from other generic webhooks. Make this long and complex if necessary to avoid brute force or dictionary attacks.

## Triggering Examples
Using curl from command line via ngrok URL with HTTP method POST:

    curl -d "trigger=curl" -H "Content-Type: application/x-www-form-urlencoded" -X POST https://16bd-2406-3003-2073-164d-25e5-71a9-2199-a24c.ap.ngrok.io/webhook/generic/mytrigger

Using curl from Jenkins pipeline with default content type:

    sh """curl -d 'trigger=jenkins' https://myusername.kaholo.net/webhook/generic/mytrigger"""

Using curl from Jenkins pipeline with JSON content type:

    sh """curl -d '{"trigger": "jenkins"}' -H "Content-Type: application/json" https://myusername.kaholo.net/webhook/generic/mytrigger"""

If the HTTP Method is "GET", pointing a web browser at the URL can trigger a pipeline execution. The browser will display only "OK". Parameters can be passed this way using URLencoded syntax, e.g..

    https://myusername.kaholo.net/webhook/generic/mytrigger?param1=alpha&another=bravo

Trigger message and payload for any execution can be viewed as JSON by clicking on the "Trigger:" item in the pipeline Executions list.

    param1: "alpha"
    another: "bravo"

## Accessing payload from code layer

The trigger payload is accessible for use in the code layer using object `kaholo.execution.trigger.payload`. In the above example, code `kaholo.execution.trigger.payload.another` will evaluate to string "bravo".