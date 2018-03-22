/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
document.getElementById("dropbtn").addEventListener("click",function(){
    var menu = document.getElementById("myDropdown");
    if(menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
});

$(".navigated").click(function(){
	ga("send", "event", "navigation", "click");
});