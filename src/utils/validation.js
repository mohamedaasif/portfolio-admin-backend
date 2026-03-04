const validateUserRole = (role) => {
  const validRoles = ["admin", "user"];
  if (!validRoles.includes(role)) return false;
  return true;
};

module.exports = { validateUserRole };
