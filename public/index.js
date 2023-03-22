const form = document.getElementById("newform");

const addData = async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const cgpa = document.getElementById("cgpa").value;
  const programme = document.getElementById("programme").value;
  const year = document.getElementById("year").value;
  const branch = document.getElementById("branch").value;
  const response = await fetch("https://mateflix.onrender.com/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, phone, cgpa, programme, year, branch }),
  });
  const result = await response.json();
  window.location.href = "https://mateflix.onrender.com/result.html";
};

form.addEventListener("submit", addData);
