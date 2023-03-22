const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});







document.querySelectorAll(".dropdown")[0].style.padding = "10px 0px 5px 0px";

document.querySelectorAll(".dropdown")[1].style.padding = "10px 0px 5px 0px";

document.querySelectorAll(".dropdown")[2].style.padding = "10px 0px 5px 0px";



document.querySelectorAll(".dropdown")[0].style.margin = "10px 0px 0px 0px";

document.querySelectorAll(".dropdown")[1].style.margin = "10px 0px 0px 0px";

document.querySelectorAll(".dropdown")[2].style.margin = "10px 0px 15px 0px";