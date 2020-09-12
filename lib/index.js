import { sep } from 'path';

const callsites = () => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
};

var callsites_1 = callsites;
// TODO: Remove this for the next major release
var _default = callsites;
callsites_1.default = _default;

var callerCallsite = ({depth = 0} = {}) => {
	const callers = [];
	const callerFileSet = new Set();

	for (const callsite of callsites_1()) {
		const fileName = callsite.getFileName();
		const hasReceiver = callsite.getTypeName() !== null && fileName !== null;

		if (!callerFileSet.has(fileName)) {
			callerFileSet.add(fileName);
			callers.unshift(callsite);
		}

		if (hasReceiver) {
			return callers[depth];
		}
	}
};

function getPackageName() {
    var callerPath = callerCallsite().getFileName();
    var packageDirPaths = atom.packages.getPackageDirPaths();
    var intersection = packageDirPaths.filter(function (packageDirPath) {
        return callerPath.startsWith(packageDirPath);
    });
    if (intersection === null || intersection === void 0 ? void 0 : intersection.length) {
        return callerPath
            .replace(intersection[0], '')
            .split(sep)
            .filter(function (fragment) { return fragment; })[0] || '';
    }
}

export { getPackageName };
