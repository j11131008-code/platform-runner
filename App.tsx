import kaboom from "kaboom";

export default function App() {
  // 檢查是否已經初始化過，避免重複生成視窗
  const canvas = document.querySelector("canvas");
  if (!canvas) {
    // 1. 初始化 Kaboom 遊戲環境
    kaboom({
      background: [141, 184, 237], // 經典天空藍背景
      width: 800,
      height: 600,
      scale: 1,
    });

    // 2. 建立跑酷遊戲場景
    scene("game", () => {
      // 這裡會自動執行你專案中設計的遊戲邏輯
      add([
        text("Game Start!", { size: 24 }),
        pos(24, 24),
      ]);

      // 玩家角色
      const player = add([
        rect(32, 48),
        pos(100, 100),
        color(255, 100, 100),
        area(),
        body(),
      ]);

      // 地板
      add([
        rect(width(), 48),
        pos(0, height() - 48),
        color(100, 255, 100),
        area(),
        body({ isStatic: true }),
      ]);

      // 基礎操作監聽
      onKeyPress("space", () => {
        if (player.isGrounded()) {
          player.jump(800);
        }
      });
    });

    // 3. 啟動遊戲
    go("game");
  }

  return null;
}
