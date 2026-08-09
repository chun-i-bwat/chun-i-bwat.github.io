(() => {
  "use strict";

  const IMMEDIATE_ARTICLES = 4;
  const ARTICLES_PER_BATCH = 4;
  const BATCH_INTERVAL_MS = 1000;
  let opening = false;

  function readArticleIds() {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const rawIds = params.get("ids") || "";

    return [...new Set(rawIds.split(",").map((id) => id.trim()))]
      .filter((id) => /^\d{5,9}$/.test(id));
  }

  function articleUrl(articleId) {
    return `https://cafe.naver.com/cyhistory/${articleId}`;
  }

  function updateProgress(completed, total) {
    const progress = document.querySelector("#progress");
    const progressBar = document.querySelector("#progress-bar");
    const percent = total > 0
      ? Math.min(100, Math.round((completed / total) * 100))
      : 0;
    progress.setAttribute("aria-valuenow", String(percent));
    progressBar.style.width = `${percent}%`;
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

  function openTab(url, name) {
    const tab = window.open(url, name);
    if (!tab) return null;

    try {
      tab.opener = null;
    } catch {}
    return tab;
  }

  function openAll(articleIds) {
    if (opening) return;
    opening = true;

    const statusTitle = document.querySelector("#status-title");
    const retryButton = document.querySelector("#retry");
    retryButton.disabled = true;
    const runId = Date.now();
    let openedCount = 0;
    let navigatedCount = 0;
    let firstTab = null;

    const immediateIds = articleIds.slice(0, IMMEDIATE_ARTICLES);
    const deferredIds = articleIds.slice(IMMEDIATE_ARTICLES);

    immediateIds.forEach((articleId, index) => {
      const tab = openTab(articleUrl(articleId), `chun-i-bwat-${runId}-${index}`);
      if (tab) {
        openedCount += 1;
        navigatedCount += 1;
        firstTab ||= tab;
      }
    });

    const reservedTabs = deferredIds.map((articleId, index) => {
      const tab = openTab("about:blank", `chun-i-bwat-${runId}-${index + IMMEDIATE_ARTICLES}`);
      if (tab) openedCount += 1;
      return { articleId, tab };
    });

    try {
      firstTab?.focus();
    } catch {}

    const blockedCount = articleIds.length - openedCount;
    updateProgress(navigatedCount, articleIds.length);
    if (blockedCount > 0) {
      statusTitle.textContent =
        `${openedCount}개 탭을 열었습니다. 차단된 ${blockedCount}개는 팝업 허용 후 다시 시도해 주세요.`;
    } else if (reservedTabs.length > 0) {
      statusTitle.textContent =
        `앞의 ${immediateIds.length}개를 열었습니다. 나머지는 1초마다 ${ARTICLES_PER_BATCH}개씩 불러옵니다.`;
    } else {
      statusTitle.textContent = `${openedCount}개 게시글을 열었습니다.`;
    }

    const batches = [];
    for (let index = 0; index < reservedTabs.length; index += ARTICLES_PER_BATCH) {
      batches.push(reservedTabs.slice(index, index + ARTICLES_PER_BATCH));
    }

    if (batches.length === 0) {
      opening = false;
      retryButton.disabled = false;
      if (blockedCount === 0) window.setTimeout(closeLauncherTab, 500);
      return;
    }

    batches.forEach((batch, batchIndex) => {
      window.setTimeout(() => {
        for (const { articleId, tab } of batch) {
          if (!tab || tab.closed) continue;
          try {
            tab.location.replace(articleUrl(articleId));
          } catch {
            tab.location.href = articleUrl(articleId);
          }
          navigatedCount += 1;
        }

        updateProgress(navigatedCount, articleIds.length);
        statusTitle.textContent = `${navigatedCount}/${articleIds.length}개 게시글을 불러왔습니다.`;

        if (batchIndex === batches.length - 1) {
          opening = false;
          retryButton.disabled = false;
          if (blockedCount === 0) window.setTimeout(closeLauncherTab, 800);
        }
      }, (batchIndex + 1) * BATCH_INTERVAL_MS);
    });
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
