const fs = require("fs");
const readline = require("readline");

const fullNames = [];
const lastNames = [];
const firstNames = [];

const rl = readline.createInterface(fs.createReadStream("datas3.list"));

const listener = rl.on("line", (line) => {
  if (line.includes("--")) {
    let fullName = line.split(" -- ")[0];
    let lastName = fullName.split(", ")[0];
    let firstName = fullName.split(", ")[1];

    fullNames.push(fullName);
    lastNames.push(lastName);
    firstNames.push(firstName);
  }
});

rl.on("close", () => {
  console.table(fullNames);
  console.table(lastNames);
  console.table(firstNames);

  function countUnique(tab) {
    var uniqueObj = {};
    tab.forEach(function (i) {
      uniqueObj[i] = (uniqueObj[i] || 0) + 1;
    });
    const countUniqueTab = Object.values(uniqueObj).filter(
      (value) => value === 1
    );
    return countUniqueTab.length;
  }

  console.log(`There are ${countUnique(fullNames)} unique full names.`);
  console.log(`There are ${countUnique(lastNames)} unique last names.`);
  console.log(`There are ${countUnique(firstNames)} unique first names.`);
});
