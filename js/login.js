///INICIAR SESIÓN///LOADER
window.addEventListener("load", function(){
  document.getElementById("loaderlo").classList.toggle("loaderlo2")
})


function login() {
    // Obtiene los valores de inicio de sesión del formulario
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Verifica las credenciales ingresadas por el usuario
    const user = JSON.parse(localStorage.getItem(username));
    if (user && user.password === password) {
      // Muestra mensaje de bienvenida en la página de inicio (Esto está por modificarse en la próxima entrega)
      const mensajeBienvenida = 'Bienvenido, ' + user.name + "!";
      Swal.fire(mensajeBienvenida);
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos, vuelva a intentarlo.',
        })
      } 
      // Redirige al usuario a la página de productos
      window.location.href = "productos.html";
    }; 


    const log = document.getElementById("log");


///Evento para que el botón cambie de color cuando el mouse se pose encima, como en el anterior.
    log.addEventListener('mouseover', function(){
      this.style.color = 'black';
      this.style.backgroundColor = "#d0b48b";
      this.style.borderColor = "#d0b48b";
    })
    
    log.addEventListener ('mouseout', function(){
      this.style.color = 'white';
      this.style.backgroundColor = "#212121";
      this.style.borderColor = "#212121";
    })