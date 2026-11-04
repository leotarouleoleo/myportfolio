// ハンバーガーメニューの開閉
(function () {
  const menu = document.getElementById("menu");
  const openBtn = document.querySelector(".js-menu-open");
  const closeBtn = document.querySelector(".js-menu-close");
  const links = document.querySelectorAll(".js-menu-link");

  //ハンバーガー開けるときの関数登録、26行目の通り、クリックされたら動く関数
  function openMenu() {
    menu.classList.add("is-open");
    // htmlのaria-hidden="true"をfalseにする。文字読み上げ機能にメニューの中の文字が読み上げ対象と伝える。
    menu.setAttribute("aria-hidden", "false");
    // aria-expanded="false"をtrueにする。文字読み上げ機能にボタン自体の状態として開いていると伝えるため。
    openBtn.setAttribute("aria-expanded", "true");
    // bodyにクラス名is-menu-openを付与する。cssでbodyにoverflow: hidden;を付与して、スクロールできないようにしてる。
    document.body.classList.add("is-menu-open");
  }
  // ハンバーガー閉じるときの関数登録
  function closeMenu() {
    menu.classList.remove("is-open");
    // openMenuでfalseにしたaria-hiddenをtrueに戻す。文字読み上げ機能に「メニューが閉じてるよ」と伝えるため。
    menu.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-menu-open");
  }
  // クリックしたら開く、閉じるの登録。条件がそろわない限り実行されない
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // メニュー内のTOPとかのリンクを押したら閉じる
  // 6行目で取ってきた全リンクをforEachで一個ずつ取り出して、全部のリンクに同じ処理付けて、クリックしたらcloseMenuを実行する。
  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Esc キーで閉じる
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  // スクロールしたらヘッダーを高さ 48px に縮める
  // クラス名がheaderの要素の一個を取ってくる。
  // ページの一番上から何px下にスクロールしたかをwindow.scrollYで数値として取ってくる。
  const header = document.querySelector(".header");
  // updateHeaderていう関数作る。
  // ページの一番上から何px下にスクロールしたかをwindow.scrollYで数値として取ってくる。
  // window.scrollYに数値が入ってる、つまりページの一番上にいない状態なら、.headerにもう一個のクラス名として.is-scrolledをつける。
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 0);
  }
  // スクロールするたびに上の操作してね。
  window.addEventListener("scroll", updateHeader);
  // このファイルを開いた瞬間の一発目の読み込み
  updateHeader();
})();
