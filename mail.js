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
    let x, y, z;
    const list_prg = ['BTECH', 'MTECH'];
    const list_br = ['CSE', 'IT', 'ECE', 'EE', 'Mechanical Eng.', 'Biomedical Eng.', 'Biotechnology', 'Civil Eng',];
    const list_yr = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year',];


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
            if (list_prg.include(option.innerText))
                x = option.innerText;
            else if (list_br.include(option.innerText))
                y = option.innerText;
            else if (list_yr.include(option.innerText))
                z = option.innerText;
        });
    });
});




const firebaseConfig = {
    apiKey: "AIzaSyBV7HR2uu8CXM8F7b4uyyaoSD4XWS1JxGM",
    authDomain: "room-selection-acfbc.firebaseapp.com",
    databaseURL: "https://room-selection-acfbc-default-rtdb.firebaseio.com",
    projectId: "room-selection-acfbc",
    storageBucket: "room-selection-acfbc.appspot.com",
    messagingSenderId: "199808755423",
    appId: "1:199808755423:web:6962ec9d128a6777716b6a"
};

// for intialize forebase 
firebase.initializeApp(firebaseConfig);

//reference of the database

var registrationfromDB = firebase.database().ref("registerarionfor");

document.getElementById('newform').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    var name = getElementVal('name');
    var phone = getElementVal('phone');
    var cgpa = getElementVal('cgpa');
    // var prg = x;
    // var bran = y;
    // var yr = z;
    console.log(name,phone,cgpa);
    savemessage
}


const savemessage=(name,phone,cgpa)=>{
    var newregistrationfrom= registrationfromDB.push();
    newregistrationfrom.set({
        name:name,
        phone:phone,
        cgpa:cgpa,
    })
}
const getElementVal = (id) => {
    return document.getElementById(id).value;
}

