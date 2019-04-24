class Autenticacion {
  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(result => {
      //Para que no intente ingresar sin haber ido al email y verificado la cuenta
      if(result.user.emailVerified){
        //cambiar la img de la parte superior derecha
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
        //Que salga su nombre
        Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000);
      }else{
        firebase.auth().signOut();
        Materialize.toast(`Por favor realiza la verificación de la cuenta`, 5000);
        $('.modal').modal('close');
      };
    })
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')
   
  }

  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      result.user.updateProfile({
        displayName: nombres
      });
      //para que le redirija a nuestra dirección después de verificar
      const configuracion = {
        url : 'http://localhost:3000/' 
      };
      //Que envie un email de verificación con un link
      result.user.sendEmailVerification(configuracion).catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      });
      //Que sólo entre a la pág si está autetificado
      firebase.auth().signOut();
      //Un mensaje para cuando entre
      Materialize.toast(
        `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
        4000
      );
      //cerrar la ventana después del mensaje
      $('.modal').modal('close');
    })
    .catch(error => {
      console.error(error)
      Materialize.toast(error.message, 4000)
    });

    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )

    $('.modal').modal('close')*/
    
  }

  authCuentaGoogle () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
