#!/bin/bash
SEQUENCR_TOKEN=$(aws logs describe-log-streams --log-group-name "LearningLogG" | jq -r '.logStreams[0].uploadSequenceToken')

echo $SEQUENCR_TOKEN

if [ $SEQUENCR_TOKEN = "null" ]; then
  aws logs put-log-events \
    --log-group-name LearningLogG \
    --log-stream-name LearningLogS \
    --log-events file://output.json
else
  aws logs put-log-events \
    --log-group-name LearningLogG \
    --log-stream-name LearningLogS \
    --log-events file://output.json \
    --sequence-token $SEQUENCR_TOKEN
fi
