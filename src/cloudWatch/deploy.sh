#!/bin/bash
aws cloudformation deploy \
--stack-name "cloudwatch-learning-stack" \
--template-file "cloudformation.yaml" \
--parameter-overrides \
LogGroupName="LearningLogG" \
LogStreamName="LearningLogS" \
RInDays=14