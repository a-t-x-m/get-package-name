'use strict';

import { sep as pathSeparator } from 'path';
import callerCallsite from 'caller-callsite';

function getPackageName(): string {
  const callerPath: string = callerCallsite().getFileName();
  const packageDirPaths: string[] = atom.packages.getPackageDirPaths();

  const intersection: string[] = packageDirPaths.filter(packageDirPath => {
    return callerPath.startsWith(packageDirPath);
  });

  if (intersection?.length) {
    return callerPath
      .replace(intersection[0], '')
      .split(pathSeparator)
      .filter(fragment => fragment)[0] || '';
  }
}

export {
  getPackageName
};
