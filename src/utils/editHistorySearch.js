const key = "HISTORY_SEARCH";

/**
 * 判断该key是否为null
 */
function isNull() {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }
}

/**
 * 添加历史搜索
 * @param {*} search
 */
function setHistorySearch(search) {
  const historySearch = JSON.parse(localStorage.getItem(key));
  // 判断是否有该值，如果有则不添加
  if (!historySearch.includes(search)) {
    historySearch.push(search);
  }
  localStorage.setItem(key, JSON.stringify(historySearch));
}

/**
 * 获取
 * @returns
 */
function getHistorySearch() {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * 删除
 */
function deleteHistorySearch() {
  localStorage.removeItem(key);
}

export default {
  isNull,
  setHistorySearch,
  getHistorySearch,
  deleteHistorySearch,
};
