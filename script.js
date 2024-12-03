

const firebaseConfig = {
    apiKey: "AIzaSyD-p8-nxKuBhcvlBtZI8V0PSXg5-rOpJf8",
    authDomain: "formulariovalidacion-536a9.firebaseapp.com",
    projectId: "formulariovalidacion-536a9",
    storageBucket: "formulariovalidacion-536a9.firebasestorage.app",
    messagingSenderId: "124318856747",
    appId: "1:124318856747:web:f45ecc62cc2231516c1c6e"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()


    //Validar campo nombre

    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un mail válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }


    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error);
            });
    }


})