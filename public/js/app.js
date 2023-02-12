var messagearray = ["Gourfood"]
var textpos = 0
var speed = 200

writer = () => {
    var msg = document.querySelector('#message')
    msg.innerHTML = messagearray[0].substring(0, textpos);
    if (textpos++ != messagearray[0].length) {
        setTimeout(writer, speed);
    }
}
window.addEventListener('load', writer)

descwriter = () => {
    var desc = document.querySelector('#desc')
    var desc1 = document.querySelector('#desc1')
    setTimeout(() => {
        desc.classList.remove('desc')
        desc1.classList.remove('desc1')
    }, 4000);

}
descwriter()


const btn = document.getElementById('btn1');   //for color of button of dark theme glow effect
const i = document.querySelector('i')
function Toggle() {   //for dark theme
    var element = document.body;
    element.classList.toggle("light-theme");
    // i.classList.toggle("fa-regular");
    // i.classList.toggle("fa-solid");
    i.classList.toggle("fa-sun");
    i.classList.toggle("fa-moon");
}


let index = 0;

const colors = ['white', 'gray'];

btn.addEventListener('click', function onClick() {
    btn.style.color = colors[index];

    index = index >= colors.length - 1 ? 0 : index + 1;
});

$(function () {
    // whenever we hover over a menu item that has a submenu
    $('#menuwrapper ul').children('li').on('mouseover', function () {
        var $menuItem = $(this),
            $submenuWrapper = $('> ul', $menuItem);

        console.log($menuItem, $submenuWrapper);

        // grab the menu item's position relative to its positioned parent
        var menuItemPos = $menuItem.position();

        // place the submenu in the correct position relevant to the menu item
        $submenuWrapper.css({
            top: menuItemPos.top,
            left: menuItemPos.left + Math.round($menuItem.outerWidth())
        });
    });
});

