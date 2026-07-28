/* Compatibility loader.
 * The paper data is split into one core file and six question chunks so the
 * browser does not need to parse one oversized source file. This wrapper keeps
 * the original index.html script path working and loads the chunks in order.
 */
(function loadPaperDataChunks() {
  const base = "papers/henan-xingce-001/";
  const files = [
    "paper-core.js",
    "questions-01.js",
    "questions-02.js",
    "questions-03.js",
    "questions-04.js",
    "questions-05.js",
    "questions-06.js"
  ];

  document.write(
    files
      .map((file) => '<script src="' + base + file + '"></' + 'script>')
      .join("")
  );
})();
