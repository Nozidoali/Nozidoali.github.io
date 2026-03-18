function setupTabs(navId, displayId) {
  var nav = document.getElementById(navId);
  var display = document.getElementById(displayId);
  var buttons = nav.querySelectorAll("button");
  var panels = display.children;

  function activate(index) {
    for (var i = 0; i < panels.length; i++) {
      panels[i].style.display = i === index ? "block" : "none";
      buttons[i].classList.toggle("active", i === index);
      buttons[i].setAttribute("aria-selected", i === index ? "true" : "false");
    }
  }

  buttons.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      activate(i);
    });
  });

  activate(0);
}

document.addEventListener("DOMContentLoaded", function () {
  setupTabs("output_nav", "output_display");
  setupTabs("input_nav", "input_display");
});
