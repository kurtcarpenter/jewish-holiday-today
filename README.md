# jewish-holiday-today
## Is today a Jewish holiday?

A really simple Alexa Skill that tells the user whether or not today is a holiday on the Hebrew calendar.

It runs as an AWS Lambda (event-driven, serverless, on-demand) function triggered when a user utters something like the phrases in `sample_utterances.txt`. Because this is an extremely naive application, there are only two intents (categories of user speech) defined in `intents.json`: asking if today is a holiday, and asking for help using the Skill.

This was my first attempt at using the Alexa SDK and Lambda.
