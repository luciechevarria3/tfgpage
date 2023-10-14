// const extsQtt = {
//   "chrome": {
//     "accesibility": 0,
//     "developer tools": 11,
//     "fun": 28,
//     "news & weather": 18,
//     "photos": 3,
//     "productivity": 76,
//     "shopping": 36,
//     "social & communication": 49,
//     "themes": 535,
//     "total": 998
//   },
//   "edge": {
//     "accesibility": 0,
//     "blogging": 7,
//     "communication": 18,
//     "developer tools": 38,
//     "entertainment": 39,
//     "news & weather": 6,
//     "photos": 14,
//     "productivity": 275,
//     "search tools": 29,
//     "shopping": 33,
//     "social": 16,
//     "sports": 2,
//     "total": 1000
//   },
//   "firefox": {
//     "alerts & updates": 68,
//     "appearance": 155,
//     "bookmarks": 49,
//     "download management": 30,
//     "feeds, news & blogging": 58,
//     "games & entertainment": 74,
//     "language support": 34,
//     "other": 126,
//     "photos, music & videos": 31,
//     "privacy & security": 96,
//     "search tools": 89,
//     "shopping": 77,
//     "social & communication": 31,
//     "tabs": 35,
//     "web development": 0,
//     "total": 1000
//   },
//   "categories": {
//     "accesibility": 255,
//     "alerts & updates": 68,
//     "appearance": 155,
//     "blogging": 7,
//     "bookmarks": 49,
//     "communication": 18,
//     "developer tools": 49,
//     "download management": 30,
//     "entertainment": 39,
//     "feeds, news & blogging": 58,
//     "fun": 28,
//     "games & entertainment": 74,
//     "language support": 34,
//     "news & weather": 24,
//     "other": 126,
//     "photos": 17,
//     "photos, music & videos": 31,
//     "privacy & security": 96,
//     "productivity": 351,
//     "search tools": 118,
//     "shopping": 146,
//     "social": 16,
//     "social & communication": 80,
//     "sports": 2,
//     "tabs": 35,
//     "themes": 535,
//     "web development": 0
//   }
// };

// const categories = ['Accesibility', 'Alerts & Updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication', 'Developer Tools', 'Download Management', 'Entertainment', 'Feeds, News & Blogging', 'Fun', 'Games & Entertainment', 'Language Support', 'News & Weather', 'Other', 'Photos', 'Photos, Music & Videos', 'Privacy & Security', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Social & Communication', 'Sports', 'Tabs', 'Web Development'];

// const chromeCategories = ['Accesibility', 'Developer Tools', 'Fun', 'News & Weather', 'Photos', 'Productivity', 'Shopping', 'Social & Communication', 'Themes'];

// const edgeCategories = ['Accesibility', 'Blogging', 'Communication', 'Developer Tools', 'Entertainment', 'News & Weather', 'Photos', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Sports'];

// const firefoxCategories = ['Alerts & Updates', 'Appearance', 'Bookmarks', 'Download Management', 'Feeds, News & Blogging', 'Games & Entertainment', 'Language Support', 'Other', 'Photos, Music & Videos', 'Privacy & Security', 'Search Tools', 'Shopping', 'Social & Communication', 'Tabs', 'Web Development'];

// const browsers = ["Google Chrome", "Microsoft Edge", "Mozilla Firefox"];

// const capitalizeWord = (loweredWord) => {
//   const capitalizedWord = loweredWord.charAt(0).toUpperCase() + loweredWord.slice(1);
//   return capitalizedWord;
// }

// const lowerWords = (words) => {
//   const loweredWords = words.map(capitalizedWord => capitalizedWord.toLowerCase());

//   return loweredWords;
// }

// const setAllCategoriesExtensionNum = (extsQtt) => {
//   const allCategories = lowerWords(['Accesibility', 'Alerts & updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication',
//     'Developer tools', 'Download management', 'Entertainment', 'Feeds, news & blogging', 'Fun', 'Games & entertainment',
//     'Language support', 'News & weather', 'Other', 'Photos', 'Photos, music & videos', 'Privacy & security', 'Productivity',
//     'Search tools', 'Shopping', 'Social', 'Social & communication', 'Sports', 'Tabs', 'Web development']);

//   let result = [];

//   let numOfExts;

//   for (let category of allCategories) {
//     numOfExts = extsQtt['categories'][category];
//     result.push(`${capitalizeWord(category)} (${numOfExts})`);
//   }

//   return result;
// }

// const setExtensionQtt = (values, extsQtt) => {
//   // Lowercasear los browsers, categorías, ...
//   const loweredValues = lowerWords(values);

//   let valuesAndQtt = [];

//   let qttOfValue;

//   // Si es categorías, hay que acceder de distinta manera a los valores

//   if (loweredValues.includes('accesibility') || loweredValues.includes('bookmarks')) {
//     for (let loweredValue of loweredValues) {
//       // Añadir a cada categoría el número de extensiones que tiene
//       // Ejemplo: Social & social (2000)
//       qttOfValue = extsQtt['categories'][loweredValue];

//       // console.log(`CATEGORY: ${loweredValue} QTTY: ${qttOfValue}`);

//       if (!qttOfValue) {
//         valuesAndQtt.push(`${capitalizeWord(loweredValue)} (0)`);
//       }
//       else {
//         valuesAndQtt.push(`${capitalizeWord(loweredValue)} (${qttOfValue})`);
//       }
//     }
//   }

//   // Caso para los browser

//   else {
//     let browser;
//     let browserExtsQtt;
//     let browserCategories;
//     for (let loweredValue of loweredValues) {
//       switch (loweredValue) {
//         case "google chrome":
//           browser = "chrome"
//           break;

//         case "microsoft edge":
//           browser = "edge"
//           break;

//         default:
//           browser = "firefox"
//           break;
//       }
//       browserExtsQtt = extsQtt[browser]['total'];
//       valuesAndQtt.push(`${capitalizeWord(browser)} (${browserExtsQtt})`);
//       browserCategories = Object.getOwnPropertyNames(extsQtt[browser]);
//       // Añadir a cada browser el número de extensiones que tiene
//       // Ejemplo: Social & social (2000)
//       for (let browserCategory of browserCategories) {
//         qttOfValue = extsQtt[browser][browserCategory];
//         if (!qttOfValue) {
//           valuesAndQtt.push(`${capitalizeWord(browserCategory)} (?)`);
//         }
//         else {
//           valuesAndQtt.push(`${capitalizeWord(browserCategory)} (${qttOfValue})`);
//         }
//       }
//     }
//   }

//   // Devolver resultado
//   return valuesAndQtt;
// }

// const setBrowsersExtensionQtt = (browsers, qttExts) => {
//   let browsersExtensionNum;
//   let normalizedBrowser;

//   let result = [];
//   for (let browser of browsers) {
//     switch (browser) {
//       case "Google Chrome":
//         normalizedBrowser = "chrome";
//         break;

//       case "Microsoft Edge":
//         normalizedBrowser = "edge";
//         break;

//       default:
//         normalizedBrowser = "firefox";
//         break;
//     }

//     browsersExtensionNum = qttExts[normalizedBrowser]['total'];
//     result.push(`${browser} (${browsersExtensionNum})`);
//   }

//   return result;
// }

// const setCategoriesNums = (browser, categories, qttExts) => {
//   let categoriesWithNums = [];

//   if (browser === "all") {
//     categoriesWithNums = categories.map(category => `${category} (${qttExts["categories"][category.toLowerCase()]})`)
//     return categoriesWithNums;
//   }

//   categoriesWithNums = categories.map(category => `${category} (${qttExts[browser][category.toLowerCase()]})`);

//   return categoriesWithNums;
// }

// const categoriesWithNums = setCategoriesNums("all", categories, extsQtt);

// console.log(categoriesWithNums);

const string = "accesibility (255)";

let res = string.replace(/[()]/g, '').replace(/[0-9]/g, '');

console.log(res);