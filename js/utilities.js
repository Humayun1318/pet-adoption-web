//Menubar click function
const menuBar = document.getElementById('menu-bar')
const menuList = document.getElementById('menu-list');
const crossBar = document.getElementById('cross-bar');
function forMenuBar() {
  menuList.classList.remove("hidden");
  menuList.classList.add('absolute', "top-12", 'right-8');
  crossBar.classList.remove('hidden')
  menuBar.classList.add('hidden')

}

function forCrossBar() {
  
  menuList.classList.add('hidden');
  menuBar.classList.remove('hidden')
  crossBar.classList.add('hidden')
}

function showLoader() {
  const spinnerContainer = document.getElementById('forSpinner');
  spinnerContainer.classList.remove('hidden');
}

function hideLoader() {
  const spinnerContainer = document.getElementById('forSpinner');
  spinnerContainer.classList.add('hidden');
}

function delay(ms) {
  return new Promise(resolve =>{setTimeout(resolve, ms)})
}