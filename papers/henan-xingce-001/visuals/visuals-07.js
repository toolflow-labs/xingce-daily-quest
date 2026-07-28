/* Reserved compatibility chunk.
 * Current paper visuals are stored in visuals-01.js through visuals-06.js.
 * Runtime compatibility fixes are loaded here until index.html is refactored.
 */
window.XINGCE_VISUALS = window.XINGCE_VISUALS || {};
document.write('<script src="src/runtime-fixes.js"></' + 'script>');
