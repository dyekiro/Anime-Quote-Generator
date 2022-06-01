const ANIME_LIST = [
  "Kono Subarashii Sekai ni Shukufuku wo!",
  "Haikyuu!! Second Season",
  "Fullmetal Alchemist: Brotherhood",
  "Bungou Stray Dogs 2nd Season",
  "Soul Eater",
  "Naruto",
  "Detective Conan",
  "Naruto Shippuuden",
  "Fairy Tail",
  "Hunter X Hunter",
  "Bleach",
  "Noragami",
  "Magi - The Labyrinth of Magic",
  "Cardcaptor Sakura",
  "No Game No Life",
  "One Piece",
  "Bungou Stray Dogs",
  "Kimi no Na wa",
  "Re:Zero kara Hajimeru Isekai Seikatsu",
  "Dice: The Cube That Changes Everything",
  "Yahari Ore No Seishun Love Come Wa Machigatteiru",
  "Eureka Seven",
  "Boku no Hero Academia",
  "Rokudenashi Majutsu Koushi to Akashic Records",
  "Legend of Zelda",
  "Koi to Uso",
  "Kakegurui",
  "Akame ga KILL!",
  "Katekyo Hitman Reborn!",
  "Trigun",
  "Tokyo Ghoul",
  "Shingeki no Kyojin",
  "Gintama",
  "Mondaiji-tachi Ga Isekai Kara Kuru Sou Desu Yo?",
  "Golgo 13",
  "Tower Of God",
  "Vinland Saga",
  "One Punch Man",
  "Guilty Crown",
  "Prince of Tennis",
  "Log Horizon",
  "Adventures of Sinbad",
  "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka",
  "Inuyasha",
  "Naruto Shippūden",
  "Fist of the North Star",
  "Shokugeki no Sōma",
  "Dragon Ball Super",
  "Haikyuu!!",
  "Hunter × Hunter",
  "Shigatsu Wa Kimi No Uso",
  "Yamada-kun to 7-nin no Majo",
  "Rurouni Kenshin",
  "Kuroshitsuji",
  "Shakugan no Shana III",
  "Shokugeki no Sōma: Ni no Sara",
  "Rakudai Kishi no Cavalry",
  "Code Geass: Lelouch of the Rebellion",
  "Cowboy Bebop",
  "Deadman Wonderland",
  "Overlord",
  "Magi - The Kingdom of Magic",
  "MAGI: The Labyrinth Of Magic",
  "Yowamushi Pedal Grande Road",
  "Hajime no Ippo",
  "Death Note",
  "Toriko",
  "Yowamushi Pedal",
  "D.Gray-man",
  "Fullmetal Alchemist",
  "Hunter x Hunter 2011",
  "Magi: Adventure of Sinbad",
  "Devil May Cry",
  "Final Fantasy VII: Crisis Core",
  "Final Fantasy XIII",
  "Nanatsu no Taizai",
  "Doraemon",
  "Shaman King",
];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const hideLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Get Quotes From API
const getQuotes = async () => {
  showLoadingSpinner();
  // const apiURL = "https://type.fit/api/quotes";

  // CORS url for anime api
  //   const proxyURL = "https://cors-anywhere.herokuapp.com/";

  //anime quotes api
  const title = "Naruto";
  const apiURL = `https://animechan.vercel.app/api/quotes/anime?title=${
    ANIME_LIST[Math.floor(Math.random() * ANIME_LIST.length)]
  }`;

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    getQuote();
  } catch (error) {
    getQuote();
    alert(error);
  }
};

//Get Single Quote
const getQuote = () => {
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check quote length for style
  quote.quote.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  //Check if author is blank
  authorText.textContent = !quote.character ? "Unknown" : quote.character;

  //Set Quote || Hide Loader
  quoteText.textContent = quote.quote;
  hideLoadingSpinner();
};

//Tweet Quote
const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
};

//Event Listener
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);
// newQuoteBtn.addEventListener("click", getQuote);

//On Load
getQuotes();
