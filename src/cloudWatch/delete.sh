#!/bin/bash
aws cloudformation delete-stack --stack-name "cloudwatch-learning-stack"

aws cloudformation wait stack-delete-complete --stack-name "cloudwatch-learning-stack"