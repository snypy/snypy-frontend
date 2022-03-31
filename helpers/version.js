const { gitDescribeSync } = require('git-describe');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false,
    longSemver: true,
    match: '[0-9]*'
});

gitInfo.date = new Date();

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
writeFileSync(file,
`// AUTO GENERATED FILE
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);