function init() {
  var chosen = document.getElementById('chosen');
  chosen.onclick = toggleDivs;
}

function toggleDivs() {
  var menu = document.getElementsByClassName('accor');
  for (var i = 0; i <= menu.length; i++)
    menu[i].classList.toggle('hide');
}