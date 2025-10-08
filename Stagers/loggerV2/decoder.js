// Encoded string (no commas)
const encodedStr = "099104114111109101";

// 1. Split every 3 characters (now adding commas in decoder)
const decodedArray = encodedStr.match(/.{3}/g).map(
  triple => parseInt(triple, 10)
);

console.log(decodedArray); // [99, 104, 114, 111, 109, 101]