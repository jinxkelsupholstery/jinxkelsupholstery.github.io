#!/bin/bash

echo "Removing old files"
aws s3 rm s3://jinxkelsupholstery/ --recursive

echo "Transferring new files..."
aws s3 cp . s3://jinxkelsupholstery/ \
	--recursive \
	--exclude ".git/*" \
	--grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers \
	full=emailaddress=noreply@example.com

echo "Clearing cache."
aws cloudfront create-invalidation \
    --distribution-id E3V670O8FNG8X1 \
    --paths "/index.html"
