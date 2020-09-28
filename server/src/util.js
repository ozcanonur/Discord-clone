const userExists = (users, newUser) => {
  const existingUser = users.filter((user) => user === newUser);
  if (existingUser.length > 0) return true;
  return false;
};

module.exports = { userExists };
