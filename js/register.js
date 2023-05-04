///
const login = document.getElementById("registrolog");
const registrarse = document.getElementById("registro");



document.addEventListener("DOMContentLoaded", function() {
  const btnregistro = document.getElementById("registro");

  btnregistro.addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica si el usuario ya existe en localStorage
    const user = JSON.parse(localStorage.getItem(username));

    if (user) {
      alert("Este nombre de usuario ya está registrado");
    } else if (!name || !username || !password) {
      alert("Debe rellenar el formulario para registrarse");
    } else {
      // Almacena información de usuario en localStorage
      localStorage.setItem(username, JSON.stringify({
        name: name,
        username: username,
        password: password
      }));

      // Redirige al usuario a la página de inicio de sesión
      location.replace("login.html");
    }
  });
});



///Evento para que el boton cambie de color cuando el Mouse se posa encima
registrarse.addEventListener('mouseover', function(){
  this.style.color = 'black';
  this.style.backgroundColor = "#d0b48b";
  this.style.borderColor = "#d0b48b";
})

///Evento para que el boton buelva a su color original cuando el Mouse se aparte
registrarse.addEventListener ('mouseout', function(){
  this.style.color = 'white';
  this.style.backgroundColor = "#212121";
  this.style.borderColor = "#212121";
})


///Al hacer click se redirige a la página siguiente, en caso de ya tener cuenta.
login.addEventListener('click', () => {
  window.location.href = "login.html";
});

login.addEventListener('mouseover', function(){
  this.style.color = "#212121";
});

login.addEventListener('mouseout', function(){
  this.style.color = "#9e4806"
});


