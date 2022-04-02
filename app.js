//the module is imported and algorithm used is aes 256
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

const initVector = crypto.randomBytes(16);

// the data we want to encrypt

const note = "This is the first note I am making";

//Secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

//cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

//encrypt the note, input encoding, output encoding

let encryptedData = cipher.update(note, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log(`Encrypted message: ${encryptedData}`);

//**********************************Decryption*********************** */

const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf-8");

console.log(`Decrypted message: ${decryptedData}`);
