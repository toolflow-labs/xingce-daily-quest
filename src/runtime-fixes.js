"use strict";

(function installResumeButtonFix() {
  const STORAGE_KEY = "xingce-progress:henan-xingce-001:v2";

  function readSavedProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (error) {
      console.warn("无法读取继续作答记录", error);
      return null;
    }
  }

  function normalizeQuestion(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 1;
    return Math.min(120, Math.max(1, Math.trunc(parsed)));
  }

  function hasMeaningfulProgress(saved) {
    if (!saved) return false;
    const answers = saved.answers && typeof saved.answers === "object" ? saved.answers : {};
    const marked = saved.marked && typeof saved.marked === "object" ? saved.marked : {};
    return Object.keys(answers).length > 0
      || Object.values(marked).some(Boolean)
      || normalizeQuestion(saved.currentQuestion) > 1;
  }

  function refreshResumeButton() {
    const button = document.getElementById("continueCampaign");
    if (!button) return;

    const saved = readSavedProgress();
    const target = normalizeQuestion(saved?.currentQuestion);
    const hasProgress = hasMeaningfulProgress(saved);

    button.disabled = false;
    button.removeAttribute("aria-disabled");
    button.dataset.resumeQuestion = String(target);
    button.textContent = hasProgress
      ? `继续上次进度 · 第 ${target} 题`
      : "暂无历史进度 · 从第 1 题开始";
    button.title = hasProgress
      ? `恢复当前浏览器保存的第 ${target} 题进度`
      : "当前浏览器暂无保存记录，点击后从第 1 题开始";
  }

  document.addEventListener("DOMContentLoaded", refreshResumeButton, { once: true });
  window.addEventListener("pageshow", refreshResumeButton);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) refreshResumeButton();
  });
})();
