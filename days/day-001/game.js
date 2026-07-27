"use strict";

const QUESTION_BANK = [
  {
    source: "改写自第 1 题",
    category: "语义锁定",
    text: "文学是其他艺术门类的酵母。“文艺”二字____了这种关系。若将文艺从文化中____出来，文化便容易成为____的学问。",
    options: [
      "解释／分离／阳春白雪",
      "注脚／分解／曲高和寡",
      "阐释／拆解／高高在上",
      "注释／剥离／束之高阁"
    ],
    answer: 3,
    explanation: "“剥离出来”搭配自然；脱离文艺感染力后，文化容易成为被“束之高阁”的学问。"
  },
  {
    source: "改写自第 5 题",
    category: "语义锁定",
    text: "蜜蜂对柑橘和咖啡的花朵仿佛着了魔一般，而对其他植物的花朵____。",
    options: ["旁若无人", "素不相识", "熟视无睹", "置若罔闻"],
    answer: 2,
    explanation: "语境强调蜜蜂看得到其他花朵，却像没有看见一样，“熟视无睹”最合适。"
  },
  {
    source: "改写自第 17 题",
    category: "主旨追踪",
    text: "一段文字指出：加强互联网金融监管并非制约企业，而是保护真正有价值的创新，企业也只有正确理解监管与发展的关系，才能走上健康轨道。其主旨是？",
    options: [
      "推进监管方式创新的价值",
      "互联网企业面临的机遇与挑战",
      "制约企业发展的客观因素",
      "监管对企业健康发展的重要性"
    ],
    answer: 3,
    explanation: "文段始终围绕监管如何促进企业规范、健康发展展开，落点在监管的重要性。"
  },
  {
    source: "改写自第 22 题",
    category: "情报扫描",
    text: "2012 年股票市值为 23 万亿元，约占当年 GDP 的 43%。下列哪项与材料不符？",
    options: [
      "城商行民间资本参股占比超过一半",
      "当年 GDP 超过 60 万亿元",
      "股票有效账户数已经过亿",
      "境内上市公司数量接近 2500 家"
    ],
    answer: 1,
    explanation: "23 ÷ 43% 约为 53.5 万亿元，因此不能推出 GDP 超过 60 万亿元。"
  },
  {
    source: "改写自第 26 题",
    category: "逻辑解码",
    text: "排序：①官员依法行政必须学习法律；②敬畏法律是官员基本修养；③依法行政才能树立法治政府形象；④敬畏法律就要依法行政；⑤依法行政的前提是懂法。",
    options: ["②④⑤①③", "③⑤②①④", "②③④①⑤", "④①②③⑤"],
    answer: 0,
    explanation: "②提出总观点，④承接“敬畏法律”，⑤转入懂法前提，①展开，③总结结果。"
  },
  {
    source: "改写自第 31 题",
    category: "轨道演算",
    text: "甲、乙、丙三个团队共有 300 多人，甲比乙多 26%。丙调 3 人给乙后，乙、丙人数相同。甲至少调多少人给丙，才能使丙人数不少于甲的 2 倍？",
    options: ["49", "35", "50", "40"],
    answer: 0,
    explanation: "结合人数为整数且总数在 300—399 之间，可得乙 100、甲 126、丙 106。令调动人数为 x：106+x≥2(126-x)，得 x≥49。"
  },
  {
    source: "改写自第 35 题",
    category: "轨道演算",
    text: "骑车 30 分钟走完一半路程，随后每分钟提速 50 米，再骑 10 分钟后距终点还有 2 千米。全程多少千米？",
    options: ["6", "7.5", "8", "8.5"],
    answer: 1,
    explanation: "设原速为 v 米/分，则 30v+10(v+50)+2000=60v，解得 v=125，全程 60v=7500 米。"
  },
  {
    source: "改写自第 38 题",
    category: "概率雷达",
    text: "袋中有 6 个红球和 4 个白球，随机取 3 个，红球不超过 1 个的概率最接近哪一项？",
    options: ["0.1", "0.2", "0.3", "0.4"],
    answer: 2,
    explanation: "有利情况为 0 红或 1 红：C(4,3)+C(6,1)C(4,2)=40；总情况 C(10,3)=120，概率为 1/3，最接近 0.3。"
  },
  {
    source: "改写自第 40 题",
    category: "工程协同",
    text: "甲、乙合作 20 天完工。合作 4 天后乙离开 6 天，此时完成 40%；乙带丙回归，三队再工作 10 天完工。甲、乙、丙效率比为？",
    options: ["3:6:10", "4:8:15", "6:3:2", "10:5:3"],
    answer: 3,
    explanation: "由前 10 天完成 40% 可得甲效率 1/30；再由甲乙合效 1/20 得乙 1/60；最后求得丙 1/100，比例为 10:5:3。"
  },
  {
    source: "改写自第 42 题",
    category: "空间建模",
    text: "一个长方体表面积为 88，长、宽、高之比为 3:2:1，它的体积是多少？",
    options: ["48", "45", "384", "3072"],
    answer: 0,
    explanation: "设三边为 3k、2k、k，表面积为 2(6+3+2)k²=22k²=88，所以 k=2，体积为 6k³=48。"
  },
  {
    source: "改写自第 44 题",
    category: "规律破解",
    text: "若每条新直线都与此前所有直线产生不同的新交点，平面被分成 46 块时，需要多少条直线？",
    options: ["7", "8", "9", "10"],
    answer: 2,
    explanation: "n 条一般位置直线最多分成 n(n+1)/2+1 块。令其等于 46，得到 n=9。"
  }
];

const state = {
  questions: [],
  index: 0,
  shield: 100,
  boss: 100,
  combo: 0,
  maxCombo: 0,
  score: 0,
  correct: 0,
  energy: 50,
  seconds: 20,
  locked: false,
  eliminated: false,
  timerId: null
};

const dom = Object.fromEntries([
  "startScreen", "gameScreen", "resultScreen", "startButton", "restartButton",
  "shieldValue", "bossValue", "comboValue", "scoreValue", "energyValue",
  "shieldBar", "bossBar", "shieldPercent", "bossPercent", "progressValue",
  "categoryValue", "sourceValue", "timerValue", "timerBar", "questionText",
  "options", "feedback", "eliminateButton", "timeButton", "battlefield",
  "rankValue", "resultTitle", "resultText", "correctValue", "finalScoreValue",
  "maxComboValue", "finalShieldValue"
].map((id) => [id, document.getElementById(id)]));

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function showScreen(target) {
  [dom.startScreen, dom.gameScreen, dom.resultScreen].forEach((screen) => {
    screen.classList.toggle("active", screen === target);
  });
}

function resetGame() {
  clearInterval(state.timerId);
  state.questions = shuffle(QUESTION_BANK).slice(0, 8);
  state.index = 0;
  state.shield = 100;
  state.boss = 100;
  state.combo = 0;
  state.maxCombo = 0;
  state.score = 0;
  state.correct = 0;
  state.energy = 50;
  state.seconds = 20;
  state.locked = false;
  state.eliminated = false;
  showScreen(dom.gameScreen);
  updateHud();
  loadQuestion();
}

function updateHud() {
  dom.shieldValue.textContent = state.shield;
  dom.bossValue.textContent = state.boss;
  dom.comboValue.textContent = state.combo;
  dom.scoreValue.textContent = state.score;
  dom.energyValue.textContent = state.energy;
  dom.shieldBar.style.width = `${state.shield}%`;
  dom.bossBar.style.width = `${state.boss}%`;
  dom.shieldPercent.textContent = `${state.shield}%`;
  dom.bossPercent.textContent = `${state.boss}%`;
  dom.progressValue.textContent = `${Math.min(state.index + 1, state.questions.length)} / ${state.questions.length}`;
  dom.eliminateButton.disabled = state.locked || state.eliminated || state.energy < 25;
  dom.timeButton.disabled = state.locked || state.energy < 20;
}

function updateTimer() {
  dom.timerValue.textContent = state.seconds;
  dom.timerBar.style.width = `${Math.max(0, Math.min(100, state.seconds / 20 * 100))}%`;
}

function loadQuestion() {
  if (state.index >= state.questions.length || state.shield <= 0 || state.boss <= 0) {
    finishGame();
    return;
  }

  clearInterval(state.timerId);
  state.locked = false;
  state.eliminated = false;
  state.seconds = 20;

  const question = state.questions[state.index];
  dom.categoryValue.textContent = question.category;
  dom.sourceValue.textContent = question.source;
  dom.questionText.textContent = question.text;
  dom.feedback.classList.remove("show");
  dom.feedback.innerHTML = "";
  dom.options.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.dataset.index = String(optionIndex);
    button.innerHTML = `<strong>${String.fromCharCode(65 + optionIndex)}.</strong> ${option}`;
    button.addEventListener("click", () => submitAnswer(optionIndex, button));
    dom.options.appendChild(button);
  });

  updateHud();
  updateTimer();
  state.timerId = window.setInterval(() => {
    state.seconds -= 1;
    updateTimer();
    if (state.seconds <= 0) {
      clearInterval(state.timerId);
      submitAnswer(-1, null);
    }
  }, 1000);
}

function animateBattle(className) {
  dom.battlefield.classList.remove("fire", "hit");
  void dom.battlefield.offsetWidth;
  dom.battlefield.classList.add(className);
  window.setTimeout(() => dom.battlefield.classList.remove(className), 650);
}

function submitAnswer(selectedIndex, selectedButton) {
  if (state.locked) return;
  state.locked = true;
  clearInterval(state.timerId);

  const question = state.questions[state.index];
  const buttons = [...dom.options.querySelectorAll("button")];
  buttons.forEach((button) => { button.disabled = true; });
  buttons[question.answer].classList.add("correct");

  if (selectedIndex === question.answer) {
    state.combo += 1;
    state.maxCombo = Math.max(state.maxCombo, state.combo);
    state.correct += 1;
    const damage = 10 + Math.min(state.combo, 4);
    state.boss = Math.max(0, state.boss - damage);
    state.score += 700 + state.seconds * 10 + state.combo * 100;
    state.energy = Math.min(100, state.energy + 15);
    dom.feedback.innerHTML = `<strong>命中，造成 ${damage} 点伤害。</strong><br>${question.explanation}`;
    animateBattle("fire");
  } else {
    state.combo = 0;
    state.shield = Math.max(0, state.shield - 25);
    state.energy = Math.min(100, state.energy + 5);
    if (selectedButton) selectedButton.classList.add("wrong");
    const reason = selectedIndex < 0 ? "超时" : "判断失误";
    dom.feedback.innerHTML = `<strong>${reason}，正确答案为 ${String.fromCharCode(65 + question.answer)}。</strong><br>${question.explanation}`;
    animateBattle("hit");
  }

  dom.feedback.classList.add("show");
  updateHud();
  window.setTimeout(() => {
    state.index += 1;
    loadQuestion();
  }, 1750);
}

function eliminateOption() {
  if (state.locked || state.eliminated || state.energy < 25) return;
  const question = state.questions[state.index];
  const candidates = [...dom.options.querySelectorAll("button")].filter((button) => {
    return Number(button.dataset.index) !== question.answer && !button.disabled;
  });
  if (!candidates.length) return;
  candidates[Math.floor(Math.random() * candidates.length)].disabled = true;
  state.energy -= 25;
  state.eliminated = true;
  updateHud();
}

function addTime() {
  if (state.locked || state.energy < 20) return;
  state.seconds = Math.min(30, state.seconds + 8);
  state.energy -= 20;
  updateTimer();
  updateHud();
}

function finishGame() {
  clearInterval(state.timerId);
  showScreen(dom.resultScreen);

  const ratio = state.correct / state.questions.length;
  const rank = ratio >= 0.9 ? "S" : ratio >= 0.75 ? "A" : ratio >= 0.5 ? "B" : "C";
  dom.rankValue.textContent = rank;
  dom.correctValue.textContent = `${state.correct} / ${state.questions.length}`;
  dom.finalScoreValue.textContent = state.score;
  dom.maxComboValue.textContent = state.maxCombo;
  dom.finalShieldValue.textContent = state.shield;

  if (state.boss <= 0) {
    dom.resultTitle.textContent = "认知核心已击破";
    dom.resultText.textContent = "战斗循环成立：判断、反馈、资源与连击共同推动了一局游戏。";
  } else if (state.shield <= 0) {
    dom.resultTitle.textContent = "上岸号失去战斗力";
    dom.resultText.textContent = "观察错题解释后再来一轮，优先守住连续判断。";
  } else {
    dom.resultTitle.textContent = "本轮航程结束";
    dom.resultText.textContent = "短局已经完成。下一轮尝试用技能换取更高连击。";
  }
}

dom.startButton.addEventListener("click", resetGame);
dom.restartButton.addEventListener("click", resetGame);
dom.eliminateButton.addEventListener("click", eliminateOption);
dom.timeButton.addEventListener("click", addTime);

document.addEventListener("keydown", (event) => {
  if (!dom.gameScreen.classList.contains("active") || state.locked) return;
  const key = event.key.toUpperCase();
  if (!"ABCD".includes(key)) return;
  const index = key.charCodeAt(0) - 65;
  const button = dom.options.querySelector(`button[data-index="${index}"]`);
  if (button && !button.disabled) button.click();
});
