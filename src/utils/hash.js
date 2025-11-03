const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(inputPassword, storedPassword) {
  const match = await bcrypt.compare(inputPassword, storedPassword);
  if (match) return true;
  else return false;
}

module.exports = { hashPassword, verifyPassword };
