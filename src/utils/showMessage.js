// 调用该方法可以弹出提示框
import styles from "./showMessage.module.scss";
export default function(options = {}) {
  const content = options.content || "";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const callback = options.cb;

  // 创建一个div
  const div = document.createElement("div");
  div.innerText = content;

  // 为div设置样式
  // 因为div为绝对定位，所以先判断div的父元素是否不是static
  if (getComputedStyle(container).position === "static" && container !== document.body) {
    container.position = "relative";
  }
  div.className = styles.message;

  container.appendChild(div);

  setInterval(() => {
    div.style = `opacity: 0`;
    div.addEventListener("transitionend", () => {
      div.remove();
      if (callback) {
        callback();
      }
    });
  }, duration);
}
