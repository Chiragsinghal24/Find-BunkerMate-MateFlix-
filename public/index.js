const form = document.getElementById('newform');
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

const addData = async (e) => {
    console.log("hello")
    e.preventDefault()
    console.log("hello")
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const cgpa = document.getElementById('cgpa').value;
    const programme = document.getElementById('programme').value;
    const year = document.getElementById('year').value;
    const branch = document.getElementById('branch').value;
    const response = await fetch('http://localhost:3000/api/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,phone,cgpa,programme,year,branch})
    });
    const result = await response.json();
    window.location.href= 'http://localhost:3000/result.html'
}

form.addEventListener('submit', addData);