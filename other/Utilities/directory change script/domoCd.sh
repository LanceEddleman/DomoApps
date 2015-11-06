#!/bin/bash
echo "Which server do you need to work on?: "
read server
cd ~/domoapps/"$server"
domo login
#done