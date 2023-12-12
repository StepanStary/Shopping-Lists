// api/validators/listValidator.js
const validateListName = (name) => {
  return name && typeof name === 'string' && name.length <= 20;
};

const validateItem = (item) => {
  return item && typeof item === 'string' && item.length <= 80;
};

module.exports = {
  validateListName,
  validateItem,
};
