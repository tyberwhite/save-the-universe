/********************************
            FUNCTIONS
**********************************/

//---------- Generate Random Alien Ship Names ----------//
export const createNamesList = (namesList) => {
  // Duplicate list of ship names for modification
  const listCopy = namesList;
  const finalNames = [];

  for (let i = 0; i < 6; i++) {
    // Generate random number between 0 and array length
    const index = Math.floor(Math.random() * listCopy.length);

    // Select random name
    const name = listCopy[index];

    // Push selected name to finalNames array
    finalNames.push(name);

    // Remove selected name from listCopy so it cannot be used again
    listCopy.splice(index, 1);
  }
  return finalNames;
};
//---------- End Generate Random Alien Ship Names ----------//

//------------------- Typing Text Effect -------------------//
export const typingEffect = (string, element) => {
  let i = 0;
  // Check if string is not null or undefined. Here, "string" is being coerced into a Boolean value.
  if (string && i < string.length) {
    // assign setInterval numerical ID
    const interval = setInterval(() => {
      if (i < string.length) {
        element.innerHTML += string.charAt(i);
        i++;
      } else {
        //
        clearInterval(interval);
      }
    }, 65);
  }
};

//----------------- End Typing Text Effect -----------------//
