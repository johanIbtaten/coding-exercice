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
  // Question 1 //
  ////////////////
  function countUnique(tab) {
    var uniqueObj = {};
    tab.forEach(function (i) {
      uniqueObj[i] = (uniqueObj[i] || 0) + 1;
    });

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

  // Question 4 //
  ////////////////
  // A)
  console.log("\n");
  console.log("---------------Question4 A-------------");

  let uniqueFullArr = countUnique(fullNames);

  const fulls = [];
  const lasts = new Set();
  const firsts = new Set();

  uniqueFullArr.forEach(function (element) {
    fulls.push(element[0]);
    lasts.add(element[0].split(", ")[0]);
    firsts.add(element[0].split(", ")[1]);
  });

  var itemLasts = Array.from(lasts);

  console.log(fulls);

  function getUniqueNames(arr) {
    let nameListCheck = [];
    let uniqueNameList = [];

    for (let i = 0; i < arr.length; i++) {
      // - On récupère une string Nom Prénom du tableau
      let str = arr[i];

      // - On sépare le nom du prénom
      let lN = str.split(", ")[0];
      let fN = str.split(", ")[1];

      // - On vérifie que le nom ou le prénom ne se trouve pas dans le tableau nameListCheck
      let isLunique = nameListCheck.includes(lN);
      let isFunique = nameListCheck.includes(fN);

      // - Si aucun des deux ne se trouve dans le tableau nameListCheck
      if (!isLunique && !isFunique) {
        //   - On push la string dans le tableau uniqueNameList
        uniqueNameList.push(str);
        //   - On ajoute le nom et le prénom au tableau nameListCheck
        nameListCheck.push(lN);
        nameListCheck.push(fN);
      }
      if (uniqueNameList.length >= 25) {
        break;
      }
    }
    return uniqueNameList;
  }

  let resUniqueNames = getUniqueNames(fulls);

  console.log(resUniqueNames);

  let lasts2 = new Set();
  let firsts2 = new Set();

  resUniqueNames.forEach(function (element) {
    // fulls.push(element[0]);
    lasts2.add(element[0].split(", ")[0]);
    firsts2.add(element[0].split(", ")[1]);
  });

  var itemLasts = Array.from(lasts2);
  var itemFirsts = Array.from(firsts2);

  let resCombinations = new Set();

  while (resCombinations.size <= 25) {
    itemLast = itemLasts[Math.floor(Math.random() * itemLasts.length)];
    itemFirst = itemFirsts[Math.floor(Math.random() * itemFirsts.length)];
    var itemFull = itemLast + ", " + itemFirst;
    if (!resUniqueNames.includes(itemFull)) {
      resCombinations.add(itemFull);
    }
  }

  console.log("\n");
  console.log("---------------Question4 B-------------");
  console.log("The new 25 unique names are:");
  console.log("combis", resCombinations);
});
