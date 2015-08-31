#!/usr/bin/bash
echo "Welcome to CLI clean up tool!"
echo "Please login into the server you would like to clean up"
domo login
#cd ..
java -jar IdeaProjects/runDomoDelete/out/artifacts/runDomoDelete_jar/runDomoDelete.jar