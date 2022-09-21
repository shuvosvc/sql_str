exports.roleChecker = (val) => {
  const trimed = val.trim();
  const usernameRegex = /^[A-Za-z]+$/;
  return usernameRegex.test(trimed);
};
