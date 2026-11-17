/* =========================================================
   ハンバーガーメニューの開閉 / スクロール時のヘッダー縮小
   ========================================================= */
(function () {
  const menu = document.getElementById("menu");
  const openBtn = document.querySelector(".js-menu-open");
  const closeBtn = document.querySelector(".js-menu-close");
  const links = document.querySelectorAll(".js-menu-link");

  // メニューを開く
  function openMenu() {
    menu.classList.add("is-open");
    // スクリーンリーダーにメニューの中身を読み上げ対象として伝える
    menu.setAttribute("aria-hidden", "false");
    // ボタンが「開いている」状態であることを伝える
    openBtn.setAttribute("aria-expanded", "true");
    // メニュー表示中は背景のスクロールを止める（CSS 側で overflow: hidden）
    document.body.classList.add("is-menu-open");
  }

  // メニューを閉じる（openMenu で変更した状態をすべて元に戻す）
  function closeMenu() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
  }

  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // メニュー内のリンクを押したら、ページ内移動と同時にメニューを閉じる
  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Esc キーでも閉じられるようにする（キーボード操作への配慮）
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // ページ最上部から少しでもスクロールしたら .is-scrolled を付け、ヘッダーを 48px に縮める
  const header = document.querySelector(".header");
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 0);
  }
  window.addEventListener("scroll", updateHeader);
  // 途中位置で再読み込みされた場合にも正しい状態で表示するため、初回にも実行
  updateHeader();
})();
