const capitalizeValue = (sentence) => {
  const sentenceWords = sentence.split(" ");
  let capitalizedWords = [];
  for (let word of sentenceWords) {
    capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  let capitalizedSentence = "";

  for (word of capitalizedWords) {
    if (word !== capitalizedWords[capitalizedWords.length - 1]) {
      capitalizedSentence += word + " ";
    }
    else {
      capitalizedSentence += word;
    }
  }

  console.log(capitalizedSentence);
}

capitalizeValue("All");