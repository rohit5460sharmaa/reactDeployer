#!/bin/bash

export GIT_REPOSITORY__URL="$GIT_REPOSITORY__URL"
#any user who gives the his own GIT URL, we try to clone that URL into /home/app/output folder  

git clone "$GIT_REPOSITORY__URL" /home/app/output

exec node script.js
# when we run our docker container then it copy the GIT url path clone the same after cloning we execute the script.js file