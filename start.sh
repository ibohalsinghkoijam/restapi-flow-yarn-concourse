#!/bin/bash

set -eu

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export fly_target=${fly_target:-devops}
echo "Concourse API target ${fly_target}"
echo "Concourse $(basename $DIR)"

pushd "$DIR"
  fly -t ${fly_target} validate-pipeline --config pipeline-test.yml
  fly -t ${fly_target} set-pipeline -p test-pipeline -c ci/pipeline-test.yml -n
  fly -t ${fly_target} unpause-pipeline -p test-pipeline
  #fly -t ${fly_target} trigger-job -w -j sample-pipeline/job-run-feature
  #fly -t ${fly_target} trigger-job -w -j sample-pipeline/job-run-develop
  fly -t ${fly_target} trigger-job -w -j test-pipeline/job-run-master
popd