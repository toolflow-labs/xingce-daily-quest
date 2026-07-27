"use strict";

const paper = window.XINGCE_PAPER;
const STORAGE_KEY = `xingce-progress:${paper.id}:v2`;

const state = {
  currentQuestion: 1,
  activeSection: paper.sections[0].id,
  answers: {},
  marked: {},
  materialScroll: {},
  sourceOpen: {},
};

const dom = Object.fromEntries([
  "intro", "campaign", "enterCampaign", "continueCampaign", "backToIntro",
  "answeredCount", "globalProgress", "openReport", "openMap", "sidebar",
  "sidebarSectionName", "sidebarSectionProgress", "sectionTabs", "questionGrid",
  "stageSection", "questionNumber", "markQuestion", "toggleSource",
  "materialLayout", "materialPanel", "materialTitle", "materialCounter",
  "materialScroll", "materialText", "materialPages", "materialNote",
  "visualAlert", "sourcePanel", "sourcePageLabel", "questionPages",
  "questionStem", "options", "answerStatus", "saveStatus", "prevQuestion",
  "clearAnswer", "nextQuestion", "mapDialog", "chapterMap", "reportDialog",
  "reportSummary", "reportSections", "resetProgress", "imageDialog",
  "imageDialogTitle", "zoomedImage"
].map((id) => [id, document.getElementById(id)]));

function sectionForQuestion(id) {
  return paper.sections.find((section) => id >= section.range[0] && id <= section.range[1]);
}

function materialForQuestion(question) {
  return question.materialId
    ? paper.materials.find((material) => material.id === question.materialId)
    : null;
}

function visualSource(assetId) {
  return window.XINGCE_VISUALS?.[assetId] || "";
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    state.currentQuestion = Number(saved.currentQuestion) || 1;
    state.answers = saved.answers || {};
    state.marked = saved.marked || {};
    state.sourceOpen = saved.sourceOpen || {};
    state.activeSection = sectionForQuestion(state.currentQuestion).id;
  } catch (error) {
    console.warn("无法读取本地进度", error);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentQuestion: state.currentQuestion,
      answers: state.answers,
      marked: state.marked,
      sourceOpen: state.sourceOpen,
      updatedAt: new Date().toISOString()
    }));
    dom.saveStatus.textContent = "已自动保存";
    window.setTimeout(() => {
      dom.saveStatus.textContent = "进度自动保存在本机";
    }, 900);
  } catch (error) {
    dom.saveStatus.textContent = "本地保存失败";
  }
}

function answeredTotal() {
  return Object.keys(state.answers).filter((id) => state.answers[id] !== undefined).length;
}

function enterCampaign(questionId = state.currentQuestion) {
  state.currentQuestion = Math.min(120, Math.max(1, Number(questionId) || 1));
  state.activeSection = sectionForQuestion(state.currentQuestion).id;
  dom.intro.classList.add("hidden");
  dom.campaign.classList.remove("hidden");
  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function backToIntro() {
  dom.campaign.classList.add("hidden");
  dom.intro.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAll() {
  renderTopProgress();
  renderSectionTabs();
  renderQuestionGrid();
  renderQuestion();
}

function renderTopProgress() {
  const count = answeredTotal();
  dom.answeredCount.textContent = `${count} / ${paper.questionCount}`;
  dom.globalProgress.style.width = `${count / paper.questionCount * 100}%`;
}

function sectionStats(section) {
  const ids = [];
  for (let id = section.range[0]; id <= section.range[1]; id += 1) ids.push(id);
  const answered = ids.filter((id) => state.answers[id] !== undefined).length;
  return { answered, total: ids.length, percent: answered / ids.length * 100 };
}

function renderSectionTabs() {
  dom.sectionTabs.innerHTML = "";
  paper.sections.forEach((section) => {
    const stats = sectionStats(section);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `section-tab${section.id === state.activeSection ? " active" : ""}`;
    button.innerHTML = `<span>${section.name}</span><small>${stats.answered}/${stats.total}</small>`;
    button.addEventListener("click", () => {
      state.activeSection = section.id;
      const currentInside = state.currentQuestion >= section.range[0] && state.currentQuestion <= section.range[1];
      if (!currentInside) state.currentQuestion = section.range[0];
      renderAll();
      saveProgress();
    });
    dom.sectionTabs.appendChild(button);
  });
}

function renderQuestionGrid() {
  const section = paper.sections.find((item) => item.id === state.activeSection);
  const stats = sectionStats(section);
  dom.sidebarSectionName.textContent = section.name;
  dom.sidebarSectionProgress.textContent = `${stats.answered} / ${stats.total}`;
  dom.questionGrid.innerHTML = "";

  for (let id = section.range[0]; id <= section.range[1]; id += 1) {
    const question = paper.questions[id - 1];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "q-node";
    if (id === state.currentQuestion) button.classList.add("current");
    if (state.answers[id] !== undefined) button.classList.add("answered");
    if (state.marked[id]) button.classList.add("marked");
    if (question.visualFirst || question.materialId) button.classList.add("visual");
    button.textContent = id;
    button.title = `第 ${id} 题`;
    button.addEventListener("click", () => navigateTo(id));
    dom.questionGrid.appendChild(button);
  }
}

function navigateTo(id) {
  preserveMaterialScroll();
  state.currentQuestion = Math.min(120, Math.max(1, Number(id)));
  state.activeSection = sectionForQuestion(state.currentQuestion).id;
  renderAll();
  saveProgress();
  document.querySelector(".stage").scrollIntoView({ behavior: "smooth", block: "start" });
}

function preserveMaterialScroll() {
  const question = paper.questions[state.currentQuestion - 1];
  const material = materialForQuestion(question);
  if (material && !dom.materialPanel.classList.contains("hidden")) {
    state.materialScroll[material.id] = dom.materialScroll.scrollTop;
  }
}

function restoreMaterialScroll(material) {
  const saved = state.materialScroll[material.id] || 0;
  requestAnimationFrame(() => {
    dom.materialScroll.scrollTop = saved;
  });
}

function renderQuestion() {
  const question = paper.questions[state.currentQuestion - 1];
  const section = sectionForQuestion(question.id);
  const material = materialForQuestion(question);

  dom.stageSection.textContent = section.subtitle;
  dom.questionNumber.textContent = `第 ${question.id} 题`;
  dom.questionStem.textContent = question.stem;
  dom.prevQuestion.disabled = question.id === 1;
  dom.nextQuestion.disabled = question.id === paper.questionCount;
  dom.markQuestion.textContent = state.marked[question.id] ? "★ 已标记" : "☆ 标记";
  dom.markQuestion.classList.toggle("marked-control", Boolean(state.marked[question.id]));

  renderOptions(question);
  renderMaterial(material, question);
  renderSourcePanel(question, material);
  renderQuestionGrid();
  renderTopProgress();
}

function renderOptions(question) {
  dom.options.innerHTML = "";
  const selected = state.answers[question.id];

  question.options.forEach((optionText, index) => {
    const letter = String.fromCharCode(65 + index);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option${selected === letter ? " selected" : ""}`;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", selected === letter ? "true" : "false");

    const displayText = optionText || `图形选项 ${letter}（请查看题图）`;
    button.innerHTML = `
      <span class="option-letter">${letter}</span>
      <span class="option-text${optionText ? "" : " image-placeholder"}">${escapeHtml(displayText)}</span>
    `;
    button.addEventListener("click", () => {
      state.answers[question.id] = letter;
      saveProgress();
      renderOptions(question);
      renderQuestionGrid();
      renderTopProgress();
    });
    dom.options.appendChild(button);
  });

  dom.answerStatus.textContent = selected ? `已选择 ${selected}` : "尚未作答";
  dom.clearAnswer.disabled = !selected;
}

function renderMaterial(material, question) {
  if (!material) {
    dom.materialPanel.classList.add("hidden");
    dom.materialLayout.classList.add("no-material");
    return;
  }

  dom.materialPanel.classList.remove("hidden");
  dom.materialLayout.classList.remove("no-material");
  dom.materialTitle.textContent = material.title;
  dom.materialText.textContent = material.text;
  dom.materialNote.textContent = material.note;
  dom.materialCounter.textContent = `${material.questionIds.indexOf(question.id) + 1} / ${material.questionIds.length}`;
  renderVisualAssets(dom.materialPages, material.visualAssets || [], `${material.title} · 原图`);
  restoreMaterialScroll(material);
}

function renderSourcePanel(question, material) {
  const assets = question.visualAssets || [];
  const canShowSource = assets.length > 0;
  const openByDefault = question.visualFirst;
  const isOpen = openByDefault || Boolean(state.sourceOpen[question.id]);

  dom.visualAlert.classList.toggle("hidden", !question.visualFirst);
  dom.toggleSource.classList.toggle("hidden", !canShowSource);
  dom.sourcePanel.classList.toggle("hidden", !canShowSource || !isOpen);
  dom.toggleSource.textContent = isOpen ? "收起题图" : "查看题图";

  dom.sourcePageLabel.textContent = canShowSource ? `${assets.length} 个原图资产` : "";
  renderVisualAssets(dom.questionPages, assets, `第 ${question.id} 题`);

  if (material && question.visualFirst) {
    dom.visualAlert.textContent = "本题含图表选项；共用材料和题目原图均已展开。";
  } else {
    dom.visualAlert.textContent = "本题依赖图形或图表，题目原图已自动展开。请选择 A—D 作答。";
  }
}

function renderVisualAssets(container, assetIds, titlePrefix) {
  container.innerHTML = "";
  assetIds.forEach((assetId, index) => {
    const src = visualSource(assetId);
    if (!src) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-image-button";
    button.innerHTML = `
      <img src="${src}" loading="lazy" alt="${titlePrefix}原图 ${index + 1}">
      <span class="page-caption">${titlePrefix} · 原图 ${index + 1} · 点击放大</span>
    `;
    button.addEventListener("click", () => openImage(src, `${titlePrefix} · 原图 ${index + 1}`));
    container.appendChild(button);
  });
}

function openImage(src, title) {
  dom.zoomedImage.src = src;
  dom.zoomedImage.alt = title;
  dom.imageDialogTitle.textContent = title;
  dom.imageDialog.showModal();
}

function escapeHtml(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span.innerHTML;
}

function renderMap() {
  dom.chapterMap.innerHTML = "";
  paper.sections.forEach((section) => {
    const stats = sectionStats(section);
    const card = document.createElement("article");
    card.className = "chapter-card";
    card.innerHTML = `
      <div class="chapter-card-head">
        <div>
          <span class="eyebrow">${section.subtitle}</span>
          <h3>${section.name}</h3>
          <p>第 ${section.range[0]}—${section.range[1]} 题</p>
        </div>
        <strong>${Math.round(stats.percent)}%</strong>
      </div>
      <div class="chapter-bar"><div style="width:${stats.percent}%"></div></div>
      <button class="${stats.answered ? "secondary" : "primary"}" type="button">
        ${stats.answered === stats.total ? "回看章节" : stats.answered ? "继续推进" : "进入章节"}
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      dom.mapDialog.close();
      const firstUnanswered = Array.from(
        { length: stats.total },
        (_, index) => section.range[0] + index
      ).find((id) => state.answers[id] === undefined);
      navigateTo(firstUnanswered || section.range[0]);
    });
    dom.chapterMap.appendChild(card);
  });
}

function renderReport() {
  const answerValues = Object.values(state.answers);
  const distribution = ["A", "B", "C", "D"].map(
    (letter) => answerValues.filter((value) => value === letter).length
  );
  const markedCount = Object.values(state.marked).filter(Boolean).length;

  dom.reportSummary.innerHTML = `
    <div class="report-stat"><small>已作答</small><strong>${answeredTotal()}</strong></div>
    <div class="report-stat"><small>未作答</small><strong>${paper.questionCount - answeredTotal()}</strong></div>
    <div class="report-stat"><small>已标记</small><strong>${markedCount}</strong></div>
    <div class="report-stat"><small>选择分布</small><strong>${distribution.join(" / ")}</strong></div>
  `;

  dom.reportSections.innerHTML = "";
  paper.sections.forEach((section) => {
    const stats = sectionStats(section);
    const row = document.createElement("div");
    row.className = "report-row";
    row.innerHTML = `
      <strong>${section.name}</strong>
      <div class="progress-track"><div class="progress-fill" style="width:${stats.percent}%"></div></div>
      <span>${stats.answered}/${stats.total}</span>
    `;
    dom.reportSections.appendChild(row);
  });
}

dom.enterCampaign.addEventListener("click", () => enterCampaign(1));
dom.continueCampaign.addEventListener("click", () => enterCampaign(state.currentQuestion));
dom.backToIntro.addEventListener("click", backToIntro);
dom.prevQuestion.addEventListener("click", () => navigateTo(state.currentQuestion - 1));
dom.nextQuestion.addEventListener("click", () => navigateTo(state.currentQuestion + 1));
dom.clearAnswer.addEventListener("click", () => {
  delete state.answers[state.currentQuestion];
  saveProgress();
  renderQuestion();
});
dom.markQuestion.addEventListener("click", () => {
  state.marked[state.currentQuestion] = !state.marked[state.currentQuestion];
  if (!state.marked[state.currentQuestion]) delete state.marked[state.currentQuestion];
  saveProgress();
  renderQuestion();
});
dom.toggleSource.addEventListener("click", () => {
  const question = paper.questions[state.currentQuestion - 1];
  if (question.visualFirst) {
    dom.sourcePanel.classList.toggle("hidden");
  } else {
    state.sourceOpen[question.id] = !state.sourceOpen[question.id];
    if (!state.sourceOpen[question.id]) delete state.sourceOpen[question.id];
    saveProgress();
    renderSourcePanel(question, materialForQuestion(question));
  }
  dom.toggleSource.textContent = dom.sourcePanel.classList.contains("hidden")
    ? "查看题图"
    : "收起题图";
});
dom.openMap.addEventListener("click", () => {
  renderMap();
  dom.mapDialog.showModal();
});
dom.openReport.addEventListener("click", () => {
  renderReport();
  dom.reportDialog.showModal();
});
dom.resetProgress.addEventListener("click", () => {
  const approved = window.confirm("确定清空这张试卷的全部本地作答和标记吗？");
  if (!approved) return;
  localStorage.removeItem(STORAGE_KEY);
  state.currentQuestion = 1;
  state.answers = {};
  state.marked = {};
  state.sourceOpen = {};
  state.activeSection = paper.sections[0].id;
  dom.reportDialog.close();
  renderAll();
});
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(button.dataset.close);
    if (dialog?.open) dialog.close();
  });
});
document.addEventListener("keydown", (event) => {
  if (dom.campaign.classList.contains("hidden")) return;
  const key = event.key.toUpperCase();
  if ("ABCD".includes(key) && !dom.imageDialog.open && !dom.mapDialog.open && !dom.reportDialog.open) {
    const question = paper.questions[state.currentQuestion - 1];
    state.answers[question.id] = key;
    saveProgress();
    renderQuestion();
  }
  if (event.key === "ArrowRight" && state.currentQuestion < 120) navigateTo(state.currentQuestion + 1);
  if (event.key === "ArrowLeft" && state.currentQuestion > 1) navigateTo(state.currentQuestion - 1);
});

loadProgress();
dom.continueCampaign.disabled = answeredTotal() === 0 && state.currentQuestion === 1;
