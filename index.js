
const path = require('path');

const resolvePkg = require('resolve-pkg');
const readPkg = require('read-pkg');
const readPkgUp = require('read-pkg-up');
const writePkg = require('write-pkg');

module.exports = addDependencies;
module.exports.getVersionLocal = getVersionLocal;

function getVersionLocal(moduleId) {
  const depPkgPath = resolvePkg(path.join(moduleId, 'package.json'));
  const depPkg = readPkg.sync(depPkgPath);
  return depPkg.version;
}

function addDependencies(dependencies, opts) {
  if (dependencies == null) dependencies = [];
  if (opts == null) opts = {};

  const pkgRet = readPkgUp.sync({
    cwd: opts.cwd,
    normalize: false
  });
  const pkg = pkgRet.pkg || {};
  const pkgPath = pkgRet.path || path.resolve(opts.cwd || process.cwd(), 'package.json');

  if (pkg.dependencies == null) pkg.dependencies = {};
  dependencies.reduce(addDependency, pkg);

  writePkg.sync(pkgPath, pkg);
}

function addDependency(pkg, dependency) {
  pkg.dependencies[dependency] = '^' + getVersionLocal(dependency);
  return pkg;
}
