export const capitalizeFirstLetter = (wordString) =>
  wordString.charAt(0).toUpperCase() + wordString.slice(1);

export const getRandomArrayElement = (someArray) =>
  someArray[Math.floor(Math.random() * someArray.length)];
