/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import readPodfile from './readPodfile';
import getPodspecName from '../config/getPodspecName';
import type {ProjectConfigIOST, DependencyConfigIOST} from 'types';

export default function isInstalled(
  iOSProject: ProjectConfigIOST,
  dependencyConfig: DependencyConfigIOST,
) {
  if (!iOSProject.podfile || !dependencyConfig.podspecPath) {
    return false;
  }
  // match line with pod declaration: pod 'dependencyPodName' (other possible parameters of pod are ignored)
  const dependencyRegExp = new RegExp(
    `pod\\s+('|")${getPodspecName(dependencyConfig.podspecPath)}('|")`,
    'g',
  );
  const podLines = readPodfile(iOSProject.podfile);
  for (let i = 0, len = podLines.length; i < len; i++) {
    const match = podLines[i].match(dependencyRegExp);
    if (match) {
      return true;
    }
  }
  return false;
}
