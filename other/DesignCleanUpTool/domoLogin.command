#!/bin/bash
declare -i FAIL=1;

echo "Welcome to CLI clean up tool!"
echo "Please login into the server you would like to clean up"
domo login
while true; do
echo -n "Please enter 0 to continue, enter 1 to try logging in again or enter 2 to quit: "
read choice
echo
case $choice in
    0)
    break;;
    1)
    domo login;;
    2)
    exit;;
    *)
echo "Invalid input, please try again";;
esac
done
cd ~/IdeaProjects/runDomoDelete/out/artifacts/runDomoDelete_jar
java -jar runDomoDelete.jar
#done