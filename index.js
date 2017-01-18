const _ = require('lodash');


function getTime(startTime) {
  const diff = process.hrtime(startTime);
  return parseFloat(((diff[0] * 1e3) + (diff[1] * 1e-6)).toFixed(3));
}

function runTest(sourceSetSize, arrayToMapSize) {

  console.log(`-----------------------------------`);
  console.log(`Test: (source: ${sourceSetSize}, array: ${arrayToMapSize})`);
  console.log(`-----------------------------------`);
  const sourceSet = [];
  for (let i = 0; i < sourceSetSize; i++) {
    sourceSet.push({
      id: i,
      name: `Source item ${i + 1}`,
    });
  }

  const arrayToMap = [];
  const divider = arrayToMapSize / sourceSetSize;
  for (let i = 0; i < sourceSetSize; i++) {
    arrayToMap.push({
      id: i,
      name: `Source item ${i + 1}`,
      sourceSetId: Math.round(i / divider),
    });
  }

  const keyByStart = process.hrtime();
  const sourceSetById = _.keyBy(sourceSet, 'id');
  for (const arrayItem of arrayToMap) {
    arrayItem.sourceSetKeyBy = sourceSetById[arrayItem.sourceSetId];
  }
  const keyByTime = getTime(keyByStart);
  console.log(`_.keyBy:   ${keyByTime}ms`);

  const findStart = process.hrtime();
  for (const arrayItem of arrayToMap) {
    arrayItem.sourceSetFind = _.find(sourceSet, ['id', arrayItem.sourceSetId]);
  }
  const findTime = getTime(findStart);
  console.log(`_.find:    ${findTime}ms`);
  console.log(`| ${sourceSetSize} / ${arrayToMapSize} | ${keyByTime}ms | ${findTime}ms |`)
}

runTest(10, 100);
runTest(10, 1000);
runTest(10, 10000);
runTest(100, 100);
runTest(100, 1000);
runTest(100, 10000);
runTest(1000, 100);
runTest(1000, 1000);
runTest(1000, 10000);
runTest(1000, 1000000);
runTest(10000, 1000000);
runTest(100000, 1000000);

console.log('Done!');