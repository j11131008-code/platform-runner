import kaboom from "kaboom";

// 萬用一鍵啟動遊戲視窗
export default function App() {
  // 檢查是否已經初始化過，避免重複
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    kaboom({
      background: [135, 206, 235], // 天空藍背景
      width: 800,
      height: 600,
      scale: 1,
    });

    // 建立一個簡單的測試方塊，確保遊戲畫面能動
    add([
      rect(48, 48),
      pos(80, 40),
      color(255, 0, 0),
    ]);
  }
  return null;
}
