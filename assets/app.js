(() => {
  "use strict";

  const MAX_ARTICLES = 100;

  function readArticleIds() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const rawIds = params.get("ids") || "";

    return [...new Set(rawIds.split(",").map((id) => id.trim()))]
      .filter((id) => /^\d{5,9}$/.test(id))
      .slice(0, MAX_ARTICLES);
  }

  function articleUrl(articleId) {
    return `https://cafe.naver.com/cyhistory/${articleId}`;
  }

  function closeLauncherTab() {
    document.documentElement.style.display = "none";
    window.close();

    window.setTimeout(() => {
      if (!window.closed) {
        window.location.replace("about:blank");
      }
    }, 200);
  }

  function openAll(articleIds) {
    for (const articleId of articleIds) {
      window.open(articleUrl(articleId), "_blank", "noopener,noreferrer");
    }

    document.querySelector("#status-title").textContent =
      `${articleIds.length}개 게시글 열기를 요청했습니다.`;
    closeLauncherTab();
  }

  function render(articleIds) {
    if (articleIds.length === 0) {
      document.querySelector("#empty").hidden = false;
      return;
    }

    const status = document.querySelector("#status");
    const actions = document.querySelector("#actions");
    const links = document.querySelector("#links");
    const count = document.querySelector("#count");

    status.hidden = false;
    actions.hidden = false;
    links.hidden = false;
    count.textContent = `총 ${articleIds.length}개 게시글`;

    for (const articleId of articleIds) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = articleUrl(articleId);
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = `게시글 ${articleId}`;
      item.append(link);
      links.append(item);
    }

    document
      .querySelector("#retry")
      .addEventListener("click", () => openAll(articleIds));

    openAll(articleIds);
  }

  render(readArticleIds());
})();
