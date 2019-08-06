#!/bin/bash

set -eu

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export fly_target=${fly_target:-devops}
echo "Concourse API target ${fly_target}"
echo "Concourse $(basename $DIR)"

pushd "$DIR"
  fly -t ${fly_target} validate-pipeline --config pipeline.yml
  fly -t ${fly_target} set-pipeline -p restapi-pipeline -c ci/pipeline.yml -n
  fly -t ${fly_target} unpause-pipeline -p restapi-pipeline
  #fly -t ${fly_target} trigger-job -w -j sample-pipeline/job-run-feature
  #fly -t ${fly_target} trigger-job -w -j sample-pipeline/job-run-develop
  fly -t ${fly_target} trigger-job -w -j restapi-pipeline/job-run-develop
popd