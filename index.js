const fs = require("fs");
const readline = require("readline");

const fullNames = [];
const lastNames = [];
const firstNames = [];

const rl = readline.createInterface(fs.createReadStream("datas2.list"));

const listener = rl.on("line", (line) => {
  if (line.includes("--")) {
    let fullName = line.split(" -- ")[0];
    [lastName, firstName] = fullName.split(", ");

    fullNames.push(fullName);
    lastNames.push(lastName);
    firstNames.push(firstName);
  }
});

rl.on("close", () => {
  // console.table(fullNames);
  // console.table(lastNames);
  // console.table(firstNames);

  // Question 1 //
  ////////////////
  function countUnique(tab) {
    var uniqueObj = {};
    tab.forEach(function (i) {
      uniqueObj[i] = (uniqueObj[i] || 0) + 1;
    });
    // console.log(uniqueObj);
    const countUniqueTab = Object.entries(uniqueObj).filter(
      (element) => element[1] === 1
    );
    return countUniqueTab;
  }
  console.log("---------------Question1-------------");
  console.log(`There are ${countUnique(fullNames).length} unique full names.`);
  console.log(`There are ${countUnique(lastNames).length} unique last names.`);
  console.log(
    `There are ${countUnique(firstNames).length} unique first names.`
  );

  // Question 2 and 3 //
  ////////////////
  function mostCommon(tab) {
    var obj = {};
    tab.forEach(function (i) {
      obj[i] = (obj[i] || 0) + 1;
    });

    var sortable = [];
    for (var key in obj) {
      sortable.push([key, obj[key]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortable;
  }

  console.log("\n");
  console.log("---------------Question2-------------");
  console.log("The ten most common first names are:");
  mostCommon(firstNames)
    .slice(0, 10)
    .forEach(function (element) {
      console.log(`${element[0]} (${element[1]})`);
    });

  console.log("\n");
  console.log("---------------Question3-------------");
  console.log("The ten most common last names are:");
  mostCommon(lastNames)
    .slice(0, 10)
    .forEach(function (element) {
      console.log(`${element[0]} (${element[1]})`);
    });

  // var uniqueFullObj = {};
  // fullNames.forEach(function (i) {
  //   uniqueFullObj[i] = (uniqueFullObj[i] || 0) + 1;
  // });
  // console.log(uniqueFullObj);
  // const countUniqueTab = Object.entries(uniqueFullObj).filter(
  //   (value) => value[1] === 1
  // );
  // Question 4 //
  ////////////////
  // A)
  console.log("\n");
  console.log("---------------Question4-------------");
  let uniqueFullArr = countUnique(fullNames).slice(0, 25);
  // console.log(countUnique(fullNames).slice(0, 25));

  const fulls = [];
  const lasts = new Set();
  const firsts = new Set();

  uniqueFullArr.forEach(function (element) {
    fulls.push(element[0]);
    lasts.add(element[0].split(", ")[0]);
    firsts.add(element[0].split(", ")[1]);
  });

  console.log(fulls);
  // console.log(lasts);
  // console.log(firsts);

  var itemLasts = Array.from(lasts);
  var itemFirsts = Array.from(firsts);

  let resCombinations = new Set();

  //let isNotUnique = true;
  while (resCombinations.size <= 25) {
    //console.log("NotUnique");
    var itemLast = itemLasts[Math.floor(Math.random() * itemLasts.length)];
    var itemFirst = itemFirsts[Math.floor(Math.random() * itemFirsts.length)];
    var itemFull = itemLast + ", " + itemFirst;
    // console.log("itemFull", itemFull);
    if (!fulls.includes(itemFull)) {
      // console.log("Unique!!!");
      resCombinations.add(itemFull);
    }
  }

  console.log("\n");
  console.log("---------------Question5-------------");
  console.log("The new 25 unique names are:");
  console.log("combis", resCombinations);
});
