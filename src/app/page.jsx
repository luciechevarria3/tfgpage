import DropdownBar from "./components/DropdownBar";
import ExtensionCard from "./components/ExtensionCard";
import PaginationControls from "./components/PaginationControls";
import SearchBar from "./components/SearchBar";
import TopBar from "./components/TopBar";

const browserValues = ["All", "Google Chrome", "Microsoft Edge", "Mozilla Firefox"];
let allCats = ['Accesibility', 'Alerts & Updates', 'Appearance', 'Blogging', 'Bookmarks', 'Communication', 'Developer Tools', 'Download Management', 'Entertainment', 'Feeds, News & Blogging', 'Fun', 'Games & Entertainment', 'Language Support', 'News & Weather', 'Other', 'Photos', 'Photos, Music & Videos', 'Privacy & Security', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Social & Communication', 'Sports', 'Tabs', 'Web Development'];
let chromeCats = ['Accesibility', 'Developer Tools', 'Fun', 'News & Weather', 'Photos', 'Productivity', 'Shopping', 'Social & Communication', 'Themes'];
let edgeCats = ['Accesibility', 'Blogging', 'Communication', 'Developer Tools', 'Entertainment', 'News & Weather', 'Photos', 'Productivity', 'Search Tools', 'Shopping', 'Social', 'Sports'];
let firefoxCats = ['Alerts & Updates', 'Appearance', 'Bookmarks', 'Download Management', 'Feeds, News & Blogging', 'Games & Entertainment', 'Language Support', 'Other', 'Photos, Music & Videos', 'Privacy & Security', 'Search Tools', 'Shopping', 'Social & Communication', 'Tabs', 'Web Development'];
let ratingValues = [1, 2, 3, 4, 5];

/**
 * Función para devolver una palabra con su inicial en mayúscula.
 * @param {palabra} loweredWord Cualquier palabra.
 * @returns la palabra con su inicial en mayúsucula.
 */
const capitalizeWord = (loweredWord) => {
  const capitalizedWord = loweredWord.charAt(0).toUpperCase() + loweredWord.slice(1);
  return capitalizedWord;
}

/**
 * Función para convertir cualquier lista de palabras en lista de palabras en minúsculas.
 * @param {palabras} words una lista cualquiera de palabras.
 * @returns La lista inicial en minúscula.
 */
const lowerWords = (words) => {
  const loweredWords = words.map(capitalizedWord => capitalizedWord.toLowerCase());

  return loweredWords;
}

/**
 * Función para crear una lista con el nombre del buscador y el número de extensiones que tiene.
 * @param {[string]} browsers Los nombres de los buscadores (Chrome, Edge, Firefox).
 * @param {{}} qttExts Cantidad de extensiones que hay en cada buscador.
 * @returns Lista con el nombre del buscador y el número de extensiones que tiene.
 */
const setBrowsersExtensionQtt = (browsers, qttExts) => {
  let browsersExtensionNum;
  let normalizedBrowser;

  let result = [];
  for (let browser of browsers) {
    switch (browser) {
      case "Google Chrome":
        normalizedBrowser = "chrome";
        break;

      case "Microsoft Edge":
        normalizedBrowser = "edge";
        break;

      case "Mozilla Firefox":
        normalizedBrowser = "firefox";
        break;

      default:
        normalizedBrowser = "all";
        break;
    }

    if (normalizedBrowser === "all") {
      browsersExtensionNum = qttExts["total"];
      result.push(`${browser} (${browsersExtensionNum})`);
    }

    else {
      browsersExtensionNum = qttExts[normalizedBrowser]['total'];
      result.push(`${browser} (${browsersExtensionNum})`);
    }

  }

  return result;
}

/**
 * Función para crear una lista con los nombres de las categorías y el número de extensiones de dicha categoría.
 * @param {string} browser Nombre del buscador.
 * @param {[string]} categories Lista de categorías de extensiones.
 * @param {{}} qttExts Número de extensiones de cada categoría.
 * @returns Lista con el nombre de la categoría y el número de extensiones de dicha categoría.
 */
const setCategoriesNums = (browser, categories, qttExts) => {
  let categoriesWithNums = [];

  if (browser === "all") {
    categoriesWithNums = categories.map(category => `${category} (${qttExts["categories"][category.toLowerCase()]})`)
    return categoriesWithNums;
  }

  categoriesWithNums = categories.map(category => `${category} (${qttExts[browser][category.toLowerCase()]})`);

  return categoriesWithNums;
}

const fetchAllExtensions = async () => {
  const res = await fetch("http://localhost:3000/api/extensions?page=0");
  const allExtensions = await res.json();

  return allExtensions;
}

/**
 * Función para conseguir datos de una API mediante su URL.
 * @param {string} URL La dirección URL de la API a la que se llama.
 * @returns Datos relacionados con la API en cuestión.
 */
const fetchData = async (URL) => {
  const res = await fetch(URL);
  const data = await res.json();

  return data;
}

/**
 * Función para conseguir información sobre el número de extensiones de cada buscador y categoría.
 * @returns Información sobre número de extensiones de cada buscador y categoría.
 */
const fetchExtsQtt = async () => {
  const res = await fetch("http://localhost:3000/api/extensions/number");
  const data = await res.json();

  return data;
}

/**
 * 
 * @param {[string]} results Lista de resultados de la búsqueda.
 */
const setSearchResults = (results) => {
  searchResults = results;
}

export default async function SearchPage({ searchParams }) {
  // const allExtensions = await fetchAllExtensions();
  const allExtensions = [
    {
      "_id": "64ff2977d9e88a28e0b76bde",
      "webstore": "Microsoft Edge",
      "name": "SCP Read Tracker",
      "url": "https://microsoftedge.microsoft.com/addons/detail/scp-read-tracker/aabbhipghfiffinaamjipdkjcifaaijd?hl=en",
      "publisher": "Tomer Verona",
      "category": "entertainment",
      "rating": 1,
      "ratedBy": 1,
      "lastUpdated": "Updated August 30, 2020",
      "image": "https://store-images.s-microsoft.com/image/apps.92.a66603ae-b6b5-4c32-b6a6-c51b3492457e.16c5cb67-2c62-4cfa-9087-91cf1c2a21b8.386e0af8-2508-4bcb-9c0f-2ac61abc5009?mode=scale&h=100&q=90&w=100",
      "installs": 342,
      "availability": "Available",
      "description": "Simple extension to keep track of SCP pages read. Syncs across devices.",
      "lastScraped": "16-10-2023 23:59:14"
    },
    {
      "_id": "64ff2978d9e88a28e0b76bdf",
      "webstore": "Microsoft Edge",
      "name": "25min Tomato Life",
      "url": "https://microsoftedge.microsoft.com/addons/detail/25min-tomato-life/aaabjobfgiidghihaedgblnbmeeejjof?hl=en",
      "publisher": "雪星实难室",
      "category": "productivity",
      "rating": 3,
      "ratedBy": 2,
      "lastUpdated": "Updated July 12, 2020",
      "image": "https://store-images.s-microsoft.com/image/apps.3348.d346acfa-8577-4fac-92c0-9677b3bc4ebe.3a7919e5-c5bf-4828-8199-ee4be1fe53b2.28689ee3-81e4-4ede-b29d-211a5a7feff7?mode=scale&h=100&q=90&w=100",
      "installs": 205,
      "availability": "Available",
      "description": "## 如何使用\n\n番茄工作法\n在每小时的 25, 55 分钟响起休息的提醒铃声，5分钟再响起工作的提醒铃声。\n在休息的时间里，你可以起身活动活动筋骨、伸个懒腰、倒杯咖啡、整理一下桌面、做些简单的运动、重整意志，在下一个25分钟继续你的工作吧。\n\n在每个小时中，您都可以听到：\n- 00:00播放C-G音符（升调），提醒您开始工作或学习\n- 25:00播放G-C音符（降调），提醒您放松5分钟\n- 30:00播放C-G音符（升调），提醒您开始工作或学习\n- 55:00播放G-C音符（降调），提醒您放松5分钟\n\n## How do this work\n\nViolent Pomodoro Technique\n\nAt 25, 55 minutes per hour, a ringing reminder bell sounds, and after 5 minutes, a ringing reminder tone works.\n\nDuring the rest period, you can get up and move your muscles, stretch out, pour a cup of coffee, tidy up the table, do some simple exercise, reorganize your will, and continue your work in the next 25 minutes.\n\nIn every hours, you can hear:\n- 00:00 plays C-G notes, reminder you start to working or learning or whatever\n- 25:00 plays G-C notes, reminder you to relax for 5 min\n- 30:00 plays C-G notes, reminder you start to working or learning or whatever\n- 55:00 plays G-C notes, reminder you to relax for 5 min\n\n番茄工作法\n在每小时的 25, 55 分钟响起休息的提醒铃声，5分钟再响起工作的提醒铃声。\n\n在休息的时间里，你可以起身活动活动筋骨、伸个懒腰、倒杯咖啡、整理一下桌面、做些简单的运动、重整意志，在下一个25分钟继续你的工作吧。\n",
      "lastScraped": "16-10-2023 23:59:13"
    },
    {
      "_id": "64ff297bd9e88a28e0b76be0",
      "webstore": "Microsoft Edge",
      "url": "https://microsoftedge.microsoft.com/addons/detail/infinity-new-tab/aadnmeanpbokjjahcnikajejglihibpd?hl=en",
      "error": "Extension Not Available",
      "name": "Infinity New Tab",
      "publisher": "Starlab Technology",
      "description": "Enhance the homepage and new tab page in a simpler way. Include: website icons,HD wallpapers, bookmarks, weather,notes,to-do,etc.\nThe Infinity New Tab is a world-renowned browser extension that can replace the default start page and new tab page of the browser, and provides a high degree of freedom and customizable options.\n\nAfter the installation is complete, you can make full use of icons, wallpapers, and widgets to manage your new tab page.\n\nFeatures:\n\n-Website icon: You can save the important websites that you visit frequently to the new tab page, just click the website icon to access.\n\n-Search engine: Easily switch mainstream search engines (Google, Baidu, Bing, etc.), additional additional search engines can also help you find search results from multiple engines at once.\n\n-Wallpaper: Open Infinity, you will see our carefully selected homepage wallpaper. You can choose from a rich wallpaper library (Bing wallpaper, Unsplash, etc.) or upload it locally.\n\n-Weather: Automatically obtain local weather and provide real-time feedback on the icon. Support to add weather for multiple cities and view the weather forecast within five days.\n\n-To-do list: task record list, you can set reminder time, it is your excellent task management efficiency tool.\n\n-Notes: Simple and clear notes, supports inserting pictures and hyperlinks, and can be saved in real time.\n\n-Bookmarks: Quickly access and manage bookmarks saved on the browser.\n\n-History management: view, search, and clear browser history\n\n-Extension management: View, enable, disable, and uninstall extensions that have been installed in the browser.\n\n-Gmail email notification: After linking the account with Gmail in the Infinity New Tab, a corner indicator of the number of unread emails will appear on the icon, accompanied by a sound reminder.\n\n-Personalized customization: The icons, search box, wallpaper, etc. on the new tab page all support personalized customization, and the size, color, shape, layout, etc. can be adjusted according to your preferences.\n\n-Cloud synchronization: After logging in, you can automatically synchronize data between different devices, and you can automatically or manually back up data to the cloud, without worrying about changing devices or data loss.\n\nFast, beautiful, efficient, and customizable! If you like it, don't forget to give Infinity a five-point positive review on the new tab page.\n\nDescription of required permissions:\n\nactiveTab: Get the title and url of the current page and add them to the icons of this extension\n\nstorage: store local data, such as wallpapers and weather\n\nunlimitedStorage: Obtain a larger storage space to store locally uploaded wallpaper information\n\nbackground: Respond to reminders of to-do items in the background, while enabling the extension to open faster\n\nPrivacy policy address: https://api.infinitynewtab.com/privacy/basic/edge/zh/privacy.html\n\nFeedback contact:\n\nQQ group: 1061365679\n\nEmail: infinitynewtab@gmail.com",
      "lastUpdated": "Updated June 19, 2023",
      "image": "https://store-images.s-microsoft.com/image/apps.7522.ce528673-9e28-43d7-b697-2a90dc5a3b6f.6cfb0ef7-7f80-4d33-91ff-cb0e18875007.a43817aa-66b2-434a-afc7-d0727ed4fe41?mode=scale&h=100&q=90&w=100",
      "lastScraped": "16-10-2023 23:59:20",
      "installs": 200000,
      "availability": "Available",
      "rating": 4,
      "category": "productivity"
    },
    {
      "_id": "64ff297bd9e88a28e0b76be1",
      "webstore": "Microsoft Edge",
      "name": "Vip Crack",
      "url": "https://microsoftedge.microsoft.com/addons/detail/vip-crack/aaeahljlflcjcbjjadhmcjhengibdonm?hl=en",
      "publisher": "LoryHuang",
      "category": "entertainment",
      "rating": 3,
      "ratedBy": 81,
      "lastUpdated": "Updated September 2, 2020",
      "image": "https://store-images.s-microsoft.com/image/apps.42793.25f5afc9-31e1-4fd8-b67f-72d6ff76fd61.f5f54c9b-f5db-45f9-806a-0e23df786a0d.297c8716-ed7e-4db5-947f-9902766138c0?mode=scale&h=100&q=90&w=100",
      "installs": 10000,
      "availability": "Available",
      "description": "给用户带来更好的观看视频体验，包括去广告、播放vip视频等等",
      "lastScraped": "16-10-2023 23:59:19"
    },
    {
      "_id": "64ff297fd9e88a28e0b76be2",
      "webstore": "Microsoft Edge",
      "name": "NTL MOD for Slither.io",
      "url": "https://microsoftedge.microsoft.com/addons/detail/ntl-mod-for-slitherio/aaennlfbcfpjgoogpigbamjeaegcnenh?hl=en",
      "publisher": "NTL - Nothing To Lose",
      "category": "entertainment",
      "rating": 5,
      "ratedBy": 1,
      "lastUpdated": "Updated September 13, 2023",
      "image": "https://store-images.s-microsoft.com/image/apps.6904.5e3c1590-8eac-4f72-8d4e-cb09921fc0b7.4e39ce00-9e05-484e-8bfd-4e70f40bc6c8.b8cd5c37-ec82-4958-86e6-e667bef66d12?mode=scale&h=100&q=90&w=100",
      "installs": 2000,
      "availability": "Available",
      "description": "This extension provides modern features and looks for playing slither.io game:\n- emoji support in chat\n- enable / disable zoom support\n- dynamic slow zoom release\n- cosmetics support (players using mobile with cosmetics codes are visible and mobile players can see your unlocked cosmetics - ALL in default install, including crown and bunny ears)\n- NTL network sharing (players using NTL MOD can see each-other's cosmetics, tags and neon skins if not in stealth mode)\n- stealth mode (only you and your team can see your true skin, nick, cosmetic & tag while others see a nameless snake with a random skin)\n- up to 240FPS for high end computers and a FPS limiter in options\n- main menu background theme (make it your own by uploading your favorite pic)\n- unlocked cosmetics and tags that can be applied to any skin, default or custom\n- realtime leaderboards for easy playing on servers of interest (closest to you, most busy, big scorers etc)\n- ping sorted list of default servers (provides a quick way of detecting servers closest to you)\n- screenshots of kills and death (remember to allow screenshots permission after loading slither by clicking on the extension's toolbar icon)\n- circle bot supporting border recognition (press T twice to activate)\n- assist function for close encounters (press R to temporarily activate)\n- border assist : autodrives the snake along the border as maxed out as possible (press R near border to activate when needed a pro squeeze)\n- skin peek: when play in low graphics press W to quickly see the true skins of snakes around. when released back to low graph skins.\n- ultra custom skins (skin builder supports full skin length with non repeat option)\n- management of custom skins (auto save, scrolling, delete, re-edit)\n- neon skins\n- control over boost effect (if disabled it helps weak computers get more steady fps)\n- snakes score in nickname\n- playing with all snakes nameless. You can still peek at names during game with W\n- nick filter (makes user-editable offensive nicknames appear as nameless). You can still peek at names during game with W\n- can open realtime leaderboars and settings while playing (if bot is on)\n- chat window that also acts as a log window for various confirmations & notifications\n- option to export / restore all settings\n- ability to join a team with valid auth keys which enable team features (chat, location sharing, team cosmetics and tags, team recognition, team play in stealth, team notifications - beeps, help, food to offer, Target Marking System (TMS), etc)\n- lots of controls available in the settings area",
      "lastScraped": "16-10-2023 23:59:26"
    },
    {
      "_id": "64ff297fd9e88a28e0b76be3",
      "webstore": "Microsoft Edge",
      "url": "https://microsoftedge.microsoft.com/addons/detail/lhasa-clipboard-extension/aagagfndgkcgkobmkbmfnhenkemjmpma?hl=en",
      "error": "Extension Not Available",
      "name": "Lhasa Clipboard Extension",
      "publisher": "Lhasa Limited",
      "category": "productivity",
      "rating": 0,
      "lastUpdated": "Updated October 13, 2020",
      "image": "https://store-images.s-microsoft.com/image/apps.12878.1e9132c0-1cda-4314-96dc-0a3c550e1483.d975489e-4104-4056-ae2f-bcc3a9d31201.6cc7e41c-afd5-4618-8921-122a2f43138f?mode=scale&h=100&q=90&w=100",
      "installs": 120,
      "availability": "Available",
      "description": "Provides enhanced clipboard support to Lhasa web applications, allowing data to be copied and pasted from other applications.",
      "lastScraped": "16-10-2023 23:59:25"
    },
    {
      "_id": "64ff2983d9e88a28e0b76be4",
      "webstore": "Microsoft Edge",
      "name": ".QR Code for Microsoft Edge",
      "url": "https://microsoftedge.microsoft.com/addons/detail/qr-code-for-microsoft-ed/aagjglbpdolboliikhgljhchhjiicbjp?hl=en",
      "publisher": "Hereafter2",
      "category": "productivity",
      "rating": 3,
      "ratedBy": 5,
      "lastUpdated": "Updated January 16, 2020",
      "image": "https://store-images.s-microsoft.com/image/apps.25352.0fef1f00-e207-49c0-b1b8-0a8d0e79a6fe.72d70af4-3052-4e91-bf1e-7025f1510cdc.11aed005-8125-431e-b221-0639a8eb0e5d?mode=scale&h=100&q=90&w=100",
      "installs": 3000,
      "availability": "Available",
      "description": "Display a QR code for visiting page.\nThen continue to read the same web page on a mobile device by scanning the QR code.\n\nIt provides two more additional commands in context menu.\n\n1. Generate a QR code for free selected text in a web page.\n2. Scan a QR code image.\n",
      "lastScraped": "18-9-2023 12:1:1"
    },
    {
      "_id": "64ff2986d9e88a28e0b76be6",
      "webstore": "Microsoft Edge",
      "name": "iDocCar Helper",
      "url": "https://microsoftedge.microsoft.com/addons/detail/idoccar-helper/aajhnjngfeamkcpdcadnmccnjhekepol?hl=en",
      "publisher": "itacerca",
      "category": "productivity",
      "rating": 0,
      "ratedBy": 0,
      "lastUpdated": "Updated September 28, 2023",
      "image": "https://store-images.s-microsoft.com/image/apps.42897.3337e223-dba0-40b9-94d2-85ea0c0d3690.3616535f-2c65-4dfe-a537-7fceb7e69341.62a71637-cab0-4d6d-9196-3647948ec10c?mode=scale&h=100&q=90&w=100",
      "installs": 307,
      "availability": "Available",
      "description": "Esta extensión permite la integración de algunos de los mas importantes sistemas CRM implantados en el sector de la automoción con la solución para digitalización de procesos iDocCar. De forma transparente para el usuario final, al completar el pedido en el  sistema CRM del distribuir correspondiente, todas su características junto con las de cliente final, vehículo objeto de la oferta, desglose económico y otros datos son transferidos a iDocCar donde se genera un expediente de venta del vehículo de forma que se pueda iniciar el proceso que finalizará en la entrega del vehículo \n\n1.9.2\n-Corrección para pedidos BMW por estructura diferente en canAuto\n\n1.9.1\n-Creación/Actualización de expedientes de pedidos desde el configurador de Volvosell\n-Creación/Actualización de expedientes de pedidos desde el configurador de Smart\n-Creación/Actualización de expedientes de pedidos desde el configurador de Leadspark\n-Creación/Actualización de expedientes de pedidos desde documentos creados desde un Excel por Leadspark\n-Creación/Actualización de expedientes de pedidos desde documentos creados desde un Word en Lamborghini\n-Creación/Actualización de expedientes de pedidos VO desde el configurador de Skoda (Imaweb)\n-Creación/Actualización de expedientes de pedidos VN y VO desde el configurador de Mercedes (MBplus) (Imaweb)\n\n1.8.20\n-Distinción de teléfono y móvil\n\n1.8.19\n-Corrección al emitir pedido agente de Cupra por cambios en el HTML\n\n1.8.18 \n-Corrección Impuesto de matriculación en Toshiko\n\n1.8.17\n-Modificación en pedidos de flotas desde el configurador COSMOS para que los opcionales negativos se creen en iDocCar como opcionales y no como campañas\n\n1.8.16\n-Recogida de opcionales negativos en pedidos VN desde el configurador de Actua (Audi), Seat, Cupra (Cosmos) y Skoda\n\n1.8.15\n-Modificación para subida de documentos PDF en pedidos VO para los entornos de Expedients y Sparta\n\n1.8.14\n-Modificación para la creación/actualización de pedidos de venta en vehículos nuevos de Skoda por cambio en el configurador\n\n1.8.13\n-Corrección en Toshiko para recoger Impuesto de matriculación en pedidos de flotas cuando viene vacio\n\n1.8.12\n-Modificación en cupra para que recoja documento de pedido de agente y el concepto total agente cupra tanto para vehículos nuevos como para flotas\n-Corrección en Toshiko para recoger Impuesto de matriculación en pedidos de flotas\n\n\n1.8.11\n-Corrección Nissan VO por nueva estructura en HTML\n\n1.8.10\n-Corrección en pedidos de venta Nissan VN y Nissan Flotas cuando el cliente es empresa\n\n1.8.9\n-Corrección para campañas en MG Salesforce cuando aparecen en mas de una línea\n-Adaptación de contratos BMW/Mini/Motos hechos en Canarias\n\n1.8.8\n-Corrección de opcionales en Audi desde el configurador de SWP\n-Corrección de opcionales en MG Salesforce cuando hay lineas de opcionales en Equipamiento Opcional\n\n1.8.7\n-Ampliación de tiempo a 2 segundos en control de instancias generadas en Toshiko para no duplicar expedientes\n\n1.8.6\n-Corrección para obtener opcionales en MG Salesforce\n\n1.8.5\n-Corrección para la obtención de datos en MG Salesforce\n\n1.8.4\n-Corrección para la obtención de datos en BMW/Moto/Mini controlando que pueden venir datos en la cabecera/pie de página del documento\n\n1.8.3\n-Corrección para la obtención de datos en MG (Autonet)\n\n1.8.2\n-Corrección para la obtención de datos en Toshiko\n-Nuevo nombre predeterminado en los documentos PDF al descargarlos desde Toshiko\n\n1.8.1\n-Creación/actualización de expedientes en iDocCar desde la carga de documentos PDF de BMW/Mini/Moto\n-Creación/actualización de expedientes en iDocCar desde el configurador de Cupra\n-Funcionalidad nueva para la creación/actualización de expedientes en iDocCar desde mediante carga de documentos en PDF de pedidos de venta.\n\n1.7.2\n-Corrección para mostrar las Unidades organizativas cuando el usuario tiene más de 3 en la misma aplicación\n\n\n1.7.1\n-Creación/actualización automática de expedientes desde el configurador Toshiko para vehículos Toyota/Lexus.\n-Creación/actualización automática de expedientes desde el configurador SWP para vehículos Audi.\n\n\n1.6.3\n-Corrección de recogida suplidos en pedidos VO de Audi \n\n1.6.2\n-Corrección para obtener el total de la operación y los opcionales para pedidos de vehículos nuevos y de flotas de Nissan\n\n1.6.1\n-Modificación para nuevo planteo económico en pedidos de Kia con suplidos específicos en conceptos “Kia Maintenance” y “Kia Insurance”\n\n1.5.9\n-Corrección para la recogida de NIF/CIF en pedidos de KIA\n1.5.8\n-Corrección para la recogida de modelo de vehículo para la creación de expedientes automáticos de los pedidos de venta de Mitsubishi\n\n1.5.7\n-Corrección para recoger descuentos que incluyan dobles comillas en pedidos de venta de KIA\n\n1.5.6\n-Modificación en pedidos Kia para recoger UACs y para no sumar la promoción Kia Insurance al total del pedido de venta\n\n1.5.5\n-Corrección en pedidos VN en tescar para la recogida de descuentos\n\n1.5.4\n-Corrección recogiendo datos en pedidos de flotas de VW Sim cuando tienen más de 1 grupo de vehículos\n\n1.5.3\n-Corrección para borrar dobles comillas en los valores de los pedidos de ventas en Toyota.\n\n1.5.2\n- Creación/Actualización automática de expedientes para flotas con varios modelos y varias unidades de Ford\n- Corrección para recogida de datos en pedidos V.O. de Audi\n\n1.4.2\n- Corrección recogiendo parámetros de los grupos de vehículos que no fuesen el primero en pedidos de flotas de VW Sim por modificación de la vista HTML\n\n1.4.1\n- Creación/actualización automatizada de expedientes en iDocCar de pedidos V.O. de Ford\n\n1.3.5\n- Modificación en campañas Para MG (Salesforce)\n\n1.3.4\n- Corrección en Seat Flotas para cuando el impuesto de matriculación esté Exento\n1.3.3\n- Los importes que sean 0 de promociones irán en campañas\n- El concepto “Conceptos especiales” dentro de la sección de Otros irá en campañas\n\n1.3.2\n- Corrección de pedidos VO en Kia Retail al subir los documentos a iDocCar\n1.3.1\n- Nueva automatización para la creación/actualización de expedientes Jaguar\n- Nueva automatización para la creación/actualización de expedientes Land Rover\n- Nueva automatización para la creación/actualización de expedientes MG (Autonet)\n\n1.2.2\n- Corrección para recoger el Teléfono en los pedidos de KIA\n1.2.1\n- Nuevo RPA para la automatización de creación/actualización de expedientes desde el configurador de MG en Salesforce\n\n1.1.1\n- Nueva funcionalidad: iDocCar Helper se comunicará con el usuario mediante pop-ups sobre la creación/actualización de los expedientes.\n- Nueva automatización: iDocCar Helper podrá crear/actualizar expedientes desde el configurador de Mitsubishi.\n- Corrección para recogida de E-Mail del cliente en Volkswagen Vehículos de ocasión.\n\n1.0.45\n- Corrección en la obtención del bastidor en AUDI VN\n\n1.0.44\nAñadidos:\n-\tFord VN y Ford Flotas\n-\tNissan VN, VO y Flotas\n-\tCorrección por recogida del total en Seat VO\n\n\n1.0.43\n- Corrección para recoger el monto a pagar para KIA flotas\n\n1.0.42\n- Corrección por nueva estructura en los pedidos de VW Sim\n\n1.0.41\n- El id con IEM Exento solo se notificará en los pedidos de Tescar\n\n1.0.40\n- Corrección descarga de pdf en Tescar\n- Importación únicamente de librerías necesarias\n- Corrección en pedidos de audi VO cuando hay un aviso antes de la base imponible\n\n\n1.0.37\n- Selección de unidades organizativas de cada usuario y visualización de las unidades organizativas seleccionadas.\n- Automatización para la creación/actualización de pedidos de Kia\n- Corrección para los pedidos de Toyota en tescar con Exento en el impuesto de matriculación\n\n1.0.33\n - Corrección para recoger impuestos de matriculación en Volkswagen SIM\n\n1.0.31\n- Corrección en pedidos de vehículos de ocasión en VW SAM cuando viene algunos campos en inglés\n\n1.0.30\n- Corrección para pedidos en SEAT VO donde no estén marcados los kms\n\n1.029\n- Corregida UO en LCV\n\n1.0.28\n- Corrección en Audi VO para impuestos y gastos\n\n1.0.27\n- Corrección en el campo Usuario de iDocCar en la pantalla de Login\n\n1.0.26 \n- Añadida política de privacidad\n\n1.0.25\n- Eliminación de permisos solicitados pero no usados.\n\n1.0.24\n- Corrección en RPA Skoda por pedidos con Impuestos de Matriculación Exentos\n\n1.0.23\n- Corrección de incidencia para flotas de Lexus donde no aparecen el monto a deber del    cliente.\n- Corrección en VW SAM por cambios en Imaweb.\n\n\n1.0.19\n- Corrección de errores vistos en Helper \n- Recogida de impuestos \n- Corrección de incidencia en Tescar en pedidos de Flotas donde no creaba expedientes del     último grupo cuando había diferentes modelos de vehículos\n\n1.0.16\n- Corrige el precio unitario en las operaciones de flota\n\n1.0.15\n- Corrección del traspaso de pedidos VO (Traspaso de datos del cliente y documento PDF de Reserva)\n- Corrección del traspaso de pedidos VN Flotas (Traspaso de datos del cliente y documento PDF del Pedido)\n- Corrección del traspaso de pedidos VN (Traspaso de algunos documentos PDF del Pedido)\n",
      "lastScraped": "16-10-2023 23:59:35"
    },
    {
      "_id": "64ff2988d9e88a28e0b76be7",
      "webstore": "Microsoft Edge",
      "name": "Gesture Based Scroll (Using AI)",
      "url": "https://microsoftedge.microsoft.com/addons/detail/gesture-based-scroll-usi/aalcccmebkgggfcbibiaddngcaipmjnd?hl=en",
      "publisher": "Leonardo Compson",
      "category": "productivity",
      "rating": 0,
      "ratedBy": 0,
      "lastUpdated": "Updated March 6, 2022",
      "image": "https://store-images.s-microsoft.com/image/apps.51256.f91445a4-6544-4e42-85ba-e67e26bb35ce.dfc3d106-1a55-4a1f-b715-18448da0ee2c.268464bf-7313-4eb9-a6f8-c9b2b3c78ff3?mode=scale&h=100&q=90&w=100",
      "installs": 214,
      "availability": "Available",
      "description": "Gesture-Based Scroll is an extension that lets you scroll a page with hand or facial gestures (without using a mouse or keyboard).\n\nBefore using this addon you need to train it first. Please read the support page to get more info on how to use the addon. Once the addon is fully trained, please click on the - Start - button and make gestures (Up, Down, and Stop) in front of the camera to scroll the active tab. Also, make sure to place your face/hand exactly in front of the camera (within the grey rectangle). As long as the camera is ON, the addon will look for your gestures and take action accordingly. If you want to stop the inferring process, please click on the - Stop - button once.\n\nNote: This addon is using the new AI engine called TensorFlow. Please visit the (https://www.tensorflow.org/js/) page to get more info about this new technology.\n\nTo report bugs, please fill out the bug report form on the addon's homepage (https://mybrowseraddon.com/gesture-based-scroll.html).\n",
      "lastScraped": "11-9-2023 16:51:52"
    }];
  // const extsQtt = await fetchExtsQtt();
  // console.log(extsQtt);
  const extsQtt = {
    "total": 81251,
    "chrome": {
      "accesibility": 0,
      "developer tools": 2729,
      "fun": 3393,
      "news & weather": 497,
      "photos": 225,
      "productivity": 11443,
      "shopping": 1960,
      "social & communication": 2394,
      "themes": 10249,
      "total": 51914
    },
    "edge": {
      "accesibility": 0,
      "blogging": 33,
      "communication": 57,
      "developer tools": 231,
      "entertainment": 188,
      "news & weather": 46,
      "photos": 43,
      "productivity": 1268,
      "search tools": 129,
      "shopping": 113,
      "social": 71,
      "sports": 7,
      "total": 4344
    },
    "firefox": {
      "alerts & updates": 1311,
      "appearance": 3843,
      "bookmarks": 1242,
      "download management": 891,
      "feeds, news & blogging": 1495,
      "games & entertainment": 1947,
      "language support": 794,
      "other": 3375,
      "photos, music & videos": 1293,
      "privacy & security": 2461,
      "search tools": 1977,
      "shopping": 808,
      "social & communication": 1169,
      "tabs": 1147,
      "web development": 2,
      "total": 24993
    },
    "categories": {
      "accesibility": 0,
      "alerts & updates": 1311,
      "appearance": 3843,
      "blogging": 33,
      "bookmarks": 1242,
      "communication": 57,
      "developer tools": 2960,
      "download management": 891,
      "entertainment": 188,
      "feeds, news & blogging": 1495,
      "fun": 3393,
      "games & entertainment": 1947,
      "language support": 794,
      "news & weather": 543,
      "other": 3375,
      "photos": 268,
      "photos, music & videos": 1293,
      "privacy & security": 2461,
      "productivity": 12711,
      "search tools": 2106,
      "shopping": 2881,
      "social": 71,
      "social & communication": 3563,
      "sports": 7,
      "tabs": 1147,
      "themes": 10249,
      "web development": 2
    }
  };

  const selectedBrowser = searchParams.browser;
  const selectedCategory = searchParams.category;
  const selectedRating = searchParams.rating;

  const selectedPage = parseInt(searchParams.page) ?? 1;

  // AÑADIR NUM DE EXTENSIONES DE CADA BROWSER
  const browserValuesWithNums = setBrowsersExtensionQtt(browserValues, extsQtt);

  // CREAR LLAMADA A API
  let apiURL = `http://localhost:3000/api/extensions?`;

  if (selectedBrowser && selectedBrowser !== "all") {
    apiURL += `&browser=${selectedBrowser.toLowerCase()}`
  }

  if (selectedCategory && selectedCategory !== "all") {
    apiURL += `&category=${selectedCategory.toLowerCase()}`
  }

  if (selectedRating && selectedRating !== "all") {
    apiURL += `&rating=${selectedRating}`
  }

  apiURL += `&page=${selectedPage}`;

  const extensions = await fetchData(apiURL);

  let categories = allCats;

  let categoriesWithNums = [];

  if (selectedBrowser) {
    if (selectedBrowser.includes("hrome")) {
      categories = chromeCats;
      categoriesWithNums = setCategoriesNums("chrome", categories, extsQtt);
    }

    if (selectedBrowser.includes("dge")) {
      categories = edgeCats;
      categoriesWithNums = setCategoriesNums("edge", categories, extsQtt);
    }

    if (selectedBrowser.includes("irefox")) {
      categories = firefoxCats;
      categoriesWithNums = setCategoriesNums("firefox", categories, extsQtt);
    }
  }

  if (categoriesWithNums.length === 0) {
    categoriesWithNums = setCategoriesNums("all", categories, extsQtt);
  }

  return (
    <>
      <TopBar />

      <div className="mx-80 mt-8 flex justify-center">
        <SearchBar allExtensions={allExtensions} />
      </div>

      <ul className="mx-80 my-12 grid grid-cols-3 gap-x-12">
        <li>
          <DropdownBar title="Browser" values={browserValuesWithNums} />
        </li>
        <li>
          <DropdownBar title="Category" values={categoriesWithNums} />
        </li>
        <li>
          <DropdownBar title="Rating" values={ratingValues} />
        </li>
      </ul>

      <div className="mx-64 grid grid-cols-4 gap-4 justify-items-center">
        {extensions.map(extension => (
          <ExtensionCard key={extension._id} name={extension.name} image={extension.image} publisher={extension.publisher} extID={extension._id} />
        ))}
      </div>

      <PaginationControls searchParams={searchParams} extensionsNum={extensions.length} />
    </>
  );
}
