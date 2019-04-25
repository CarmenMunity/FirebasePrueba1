$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig);

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time
  const post = new Post();
  post.consultarTodosPost();

  // TODO: Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      $('#btnInicioSesion').text('Salir');
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL);
      }else{
        $('#avatar').attr('src', 'imagenes/usuario_auth.png');
      }
    }else{
      $('#btnInicioSesion').text('Iniciar Sesión');
      $('#avatar').attr('src', 'imagenes/usuario.png');
    }
  });
  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser;
    if( user ){
      $('#btnInicioSesion').text('Iniciar Sesión');
      return firebase.auth().singOut().then(() =>{
        $('#avatar').attr('src', 'imagenes/usuario.png');
        Materialize.toast(`SignOut Correcto`, 4000);
      }).catch( error => {
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000);
      });
    }
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
    

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    firebase.auth().singOut()
    .then(() => {
      $('#avatar').attr('src', 'imagenes/usuario.png');
      Materialize.toast(`SignOut correcto`, 4000);
    }).catch(error=>{
      Materialize.toast(`Error al realizar SignOut ${error}`, 4000);
    });
    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  });

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad');  
    const post = new Post();
    post.consultarTodosPost();

  });

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser;
    if( user ){
      const post = new Post();
      post.consultarPostxUsuario(user.email);
      $('#tituloPost').text('Mis Posts');
    }else{
      Materialize.toast(`Debe estar autenticado para ver sus posts`, 4000);
    }
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })
})
