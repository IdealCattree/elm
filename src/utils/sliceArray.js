/**
 * 将一个数组分成几个同等长度的数组
 * @param {*} array 分割的原数组
 * @param {*} size 每个数组的长度
 */
export default function sliceArray(array, size) {
  const result = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    const start = i * size;
    const end = start + size;
    result.push(array.slice(start, end));
  }
  return result;
}
