const fs = require("fs");

// Function to convert an ASCII array back to a string
function asciiArrayToString(asciiArray) {
    return asciiArray.map(code => String.fromCharCode(code)).join('');
}

// Function to read the ASCII array from a file, decode it, and save as a text file
function readDecodeAndSaveAsciiFile(inputFile, outputFile) {
    try {
        // Read file content
        const fileContent = fs.readFileSync(inputFile, "utf8");

        // Parse the JSON-formatted ASCII array
        const asciiArray = JSON.parse(fileContent);

        // Convert ASCII array back to a string
        const decodedString = asciiArrayToString(asciiArray);

        // Write the decoded string to a new text file
        fs.writeFileSync(outputFile, decodedString, "utf8");

        console.log(`✅ Decoded text saved to: ${outputFile}`);
    } catch (error) {
        console.error("❌ Error reading or writing the file:", error);
    }
}

// Convert and save the decoded text
readDecodeAndSaveAsciiFile("ascii_array.txt", "decoded_text.txt");
