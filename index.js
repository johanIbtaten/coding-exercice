const fs = require("fs");
const readline = require("readline");

const fullNames = [];
const lastNames = [];
const firstNames = [];

const rl = readline.createInterface(fs.createReadStream("datas2.list"));

const listener = rl.on("line", (line) => {
  // Pour chaque ligne qui contient "--"
  if (line.includes("--")) {
    // On récupère ce qu'il y a avant les "--"
    let fullName = line.split(" -- ")[0];
    // En destructurant et en splitant au niveau de ", " on récupère le lastName
    // et le firstName
    [lastName, firstName] = fullName.split(", ");

    // On push les string récupérées dans des tableaux
    fullNames.push(fullName);
    lastNames.push(lastName);
    firstNames.push(firstName);
  }
});

rl.on("close", () => {
  // Question 1 //
  ////////////////
  function countOccurences(arr) {
    // Le reduce renvoie un objet avec le nombre d'occurences par item du tableau
    return arr.reduce(function (occ, item) {
      // Pour chaque item du tableau on crée une propriété dans l'accumulateur
      // qui a pour valeur l'item. Si la proprété a déja une valeur, on fait la valeur + 1
      // Si la propriété n'a pas encore de valeur alors la valeur sera 0 + 1
      occ[item] = (occ[item] || 0) + 1;
      // on retourne l'accumulateur
      return occ;
      // On définit un accumulateur objet {}
    }, {});
  }

  // Fonction qui va retourner un tableau d'occurrences uniques d'un tableau en entrée
  function uniqueOccArr(arr) {
    // Objet avec le nombre d'occurences par item du tableau
    let occurrences = countOccurences(arr);

    // On transforme l'objet en  tableau d'entrées [item, nombre_occurences]
    // On filtre les entrées qui ont pour valeur 1
    let countUniqueArr = Object.entries(occurrences).filter(
      (element) => element[1] === 1
    );

    // On retourne le tableau des items uniques
    return countUniqueArr;
  }

  let uniqueNamesArr = uniqueOccArr(fullNames);
  let uniqueLastNamesArr = uniqueOccArr(lastNames);
  let uniqueFirstNamesArr = uniqueOccArr(firstNames);

  console.log("---------------Question1-------------");
  console.log(`There are ${uniqueNamesArr.length} unique full names.`);
  console.log(`There are ${uniqueLastNamesArr.length} unique last names.`);
  console.log(`There are ${uniqueFirstNamesArr.length} unique first names.`);

  // Question 2 and 3 //
  ////////////////
  function mostCommon(arr) {
    // On récupère l'objet des occurences du tableau
    let occurrences = countOccurences(arr);

    // On le transforme en tableau d'entrées
    let occurrencesArr = Object.entries(occurrences);

    // On tri le tableau en comparant les nombres d'occurence de chaque entrée
    occurrencesArr.sort(function (a, b) {
      return b[1] - a[1];
    });

    // On retourne le tableau des entrées triées et formatées
    return occurrencesArr.map((element) => {
      return `${element[0]} (${element[1]})`;
    });

    return arrResult;
  }

  console.log("\n");
  console.log("---------------Question2-------------");
  console.log("The ten most common first names are:");
  // On affiche les 10 premiers items du tableau
  console.log(mostCommon(firstNames).slice(0, 10));

  console.log("\n");
  console.log("---------------Question3-------------");
  console.log("The ten most common last names are:");
  console.log(mostCommon(lastNames).slice(0, 10));

  // Question 4 //
  ////////////////
  // A)
  console.log("\n");
  console.log("---------------Question4 A-------------");

  // On récupère le tableau des names unique
  let fulls = uniqueNamesArr.map((item) => item[0]);

  // console.log(fulls);

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
        //  - On push la string dans le tableau uniqueNameList
        uniqueNameList.push(str);
        //  - On ajoute le nom et le prénom au tableau nameListCheck
        nameListCheck.push(lN);
        nameListCheck.push(fN);
      }
      // Quand le tableau contient 25 names on sort de la boucle
      if (uniqueNameList.length >= 25) {
        break;
      }
    }
    return uniqueNameList;
  }

  let resCompleteUniqueNames = getUniqueNames(fulls);

  console.log(resCompleteUniqueNames);

  // On récupère les last names uniques
  let uniqueLastsArr = resCompleteUniqueNames.map(
    (item) => item.split(", ")[0]
  );
  // On récupère les first names uniques
  let uniqueFirstsArr = resCompleteUniqueNames.map(
    (item) => item.split(", ")[1]
  );

  // B)
  /*
  - Je récupère un lastName au hasard dans uniqueLastsArr
  - Je récupère un firstName au hasard dans uniqueFirstsArr
  - Je les joins pour faire un name
  - Je cherche si cette combinaison name existe dans le tableau resCompleteUniqueNames  
  - Si il n'existe pas je le push dans un tableau newCombiNamesArr
  - Je filtre le tableau newCombiNamesArr pour n'avoir que des name avec lastName et firstName uniques
  - Quand le tableau atteint 25 de long j'arrête la génération
  */

  function uniqueCombiNames(arr) {
    let newCombiNamesArr = [];
    while (newCombiNamesArr.length < 25) {
      // - Je récupère un lastName au hasard dans uniqueLastsArr
      randLastName =
        uniqueLastsArr[Math.floor(Math.random() * uniqueLastsArr.length)];
      // - Je récupère un firstName au hasard dans uniqueFirstsArr
      randFirstName =
        uniqueFirstsArr[Math.floor(Math.random() * uniqueFirstsArr.length)];
      // - Je les joins pour faire un name
      let randName = randLastName + ", " + randFirstName;
      // - Je cherche si ce name existe dans le tableau resCompUniqueNames
      if (!resCompleteUniqueNames.includes(randName)) {
        newCombiNamesArr.push(randName);
        // - On filtre à chaque boucle le tableau newCombiNamesArr pour
        // n'avoir que des name avec lastName et firstName uniques
        newCombiNamesArr = getUniqueNames(newCombiNamesArr);
      }
    }
    return newCombiNamesArr;
  }

  console.log("\n");
  console.log("---------------Question4 B-------------");
  console.log("The new 25 unique names are:");
  console.log("combis", uniqueCombiNames(resCompleteUniqueNames));
});
