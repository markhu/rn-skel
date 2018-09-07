#!/bin/bash

export NODE_BINARY=node

target_platform=${1:-android}
[[ ${target_platform} = *"android"* ]] && echo "Target platform: ${target_platform}. To setup 'ios', run 'yarn setup ios'."

cp tslint.yml packages/mobile/tslint.yml
cp tslint.yml packages/state-manager/tslint.yml

(cd packages/state-manager && yarn && yarn link)
(cd packages/mobile && yarn && yarn link @g-ui/state-manager)

[[ ${target_platform} = *"ios"* ]] && cd packages/mobile/ios && pod install

echo "Ready for target_platform: ${target_platform}"
