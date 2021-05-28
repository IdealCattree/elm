export const setStorage = (key, value) => {
  if (!key) {
    return;
  }
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

export const getStoreage = key => {
  if (!key) return;
  return localStorage.getItem(key);
};

export const removeStorage = key => {
  if (!key) return;
  return localStorage.removeItem(key);
};
