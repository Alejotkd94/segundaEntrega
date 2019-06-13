const hbs = require('hbs');
const funciones = require('../funciones');
listaCursos =[];
listaEstudiantes = [];

hbs.registerHelper('listarCursos',() =>{
	
	listaCursos = funciones.listCurso();

 let texto=`<table class="table table-striped">
			  <thead>
			    <tr>
			      <th scope="col">Id</th>
			      <th scope="col">Nombre</th>
			      <th scope="col">Descripción</th>
			      <th scope="col">Valor</th>
			      <th scope="col">Modalidad</th>
  			      <th scope="col">Intesidad</th>
			      <th scope="col">Estado</th>
			    </tr>
			  </thead>
			  <tbody>`;


  listaCursos.forEach(oCurso=>{
		texto = texto + `<tr>
				  <th scope="row">${oCurso.idCurso}</th>
				  <td>${oCurso.nombreCurso}</td>
				  <td>${oCurso.descripcion}</td>
				  <td>${oCurso.valor}</td>
				  <td>${oCurso.modalidad}</td>
				  <td>${oCurso.intensidadHoraria}</td>
				  <td>${oCurso.estado}</td>
				</tr>`;
	});

  	texto = texto + "</tbody>"+
					"</table>";
	return texto;
});

hbs.registerHelper('selectCursos',() =>{
	
	listaCursos = funciones.listCurso();

 let texto=`<select class="form-control form-control-lg" id="listCurso" name="idCurso" required>
			        <option value="">Seleccione un curso</option>`;

listaCursos.forEach(oCurso=>{
  	if(oCurso.estado == 'Habilitado'){
  		texto = texto + `<option value="${oCurso.idCurso}">${oCurso.nombreCurso}</option>`;
  	}
});

  	texto = texto + "</select>";
	return texto;
});

hbs.registerHelper('verlistaCursos',() =>{
	
	listaCursos = funciones.listCurso();

   let texto = ``;

	listaCursos.forEach(oCurso=>{
  	if(oCurso.estado == 'Habilitado'){
  		texto= texto +`<div class="col-sm-12 col-lg-12 mt-2">
							<div class="accordion" id="accordionCursos${oCurso.idCurso}">
								  <div class="card">
									    <div class="card-header" id="${oCurso.idCurso}">
										    	<p>
										    		Curso : ${oCurso.nombreCurso}<br>
										    		Valor : $${oCurso.valor}
										    	</p>
										    	<hr>
										      <h2 class="mb-0">
										      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${oCurso.idCurso}" aria-expanded="true" aria-controls="collapse${oCurso.idCurso}">
										          Mas Información
										       </button>
										      </h2>
									    </div>

								       <div id="collapse${oCurso.idCurso}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCursos${oCurso.idCurso}">
									      <div class="card-body">
										      	<ul class="list-group">
												  <li class="list-group-item"><strong>Descripción :</strong> ${oCurso.descripcion}</li>
												  <li class="list-group-item"><strong>Modalidad :</strong> ${oCurso.modalidad}</li>
												  <li class="list-group-item"><strong>Intensidad horaria :</strong> ${oCurso.intensidadHoraria}</li>
												  <li class="list-group-item"><strong>Valor :</strong> $${oCurso.valor}</li>
												</ul>
											</div>					        
								      </div>
								    </div>
							 </div>
					</div>`;
  	}
});
return texto;
});


hbs.registerHelper('listarInscriptos',() =>{
	
	listaCursos = funciones.listCurso();
	listaEstudiantes = funciones.listInscripcion();

   let texto = ``;

	listaCursos.forEach(oCurso=>{
  	if(oCurso.estado == 'Habilitado'){

  		texto= texto +`<div class="col-sm-12 col-lg-12 mt-4">
							<div class="accordion" id="accordionCursos${oCurso.idCurso}">
								  <div class="card">
									    <div class="card-header" id="${oCurso.idCurso}">
										    	<p>
										    		Curso : ${oCurso.nombreCurso}<br>										    		
										    	</p>
										    	<hr>
										      <h2 class="mb-0">
										      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${oCurso.idCurso}" aria-expanded="true" aria-controls="collapse${oCurso.idCurso}">
										          Mostrar inscritos.
										       </button>
										      </h2>
									    </div>

								       <div id="collapse${oCurso.idCurso}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCursos${oCurso.idCurso}">
									      <div class="card-body">`;

  							      	  let oInscrito = listaEstudiantes.filter(buscar => buscar.idCurso == oCurso.idCurso);
  							      	  if(oInscrito.length > 0){
	  							      	  	texto= texto +` <table class="table">
																  <thead class="thead-dark">
																    <tr>
																      <th scope="col">Documento</th>
																      <th scope="col">Nombre</th>
																      <th scope="col">Correo eléctronico</th>
																      <th scope="col">Teléfono</th>
																      <th scope="col">Eliminar</th>
																    </tr>
																  </thead>
																  <tbody>`;
	  							      	  	oInscrito.forEach(oEst=>{
											  texto= texto +`
											  				 	    <tr>
																      <th>${oEst.docIdentidad}</th>
																      <td>${oEst.nombre}</td>
																      <td>${oEst.email}</td>
																      <td>${oEst.telefono}</td>`

																      texto= texto +`<td>
																      <form action="/eliminarAspirante" method="post">
																		  <div class="form-group">
																		    <input type="hidden" name="idCurso" value="${oCurso.idCurso}" >
																		    <input type="hidden" name="docIdentidad" value="${oEst.docIdentidad}" >
																		  <button type="hidden" class="btn btn-danger">Eliminar</button>
																		</form>
																      </td>
																    </tr>`;
										    });
										}

										texto= texto +`</tbody>
															</table>`;
		texto= texto + `</div>					        
					      </div>
					    </div>
				 </div>
			</div>`;
  	}
});
return texto;
});


hbs.registerHelper('listarUsuarios',() =>{
	
	listaUsuarios = funciones.listUsuarios();

 let texto=`<table class="table table-striped">
			  <thead>
			    <tr>
			      <th scope="col">Documento Identidad</th>
			      <th scope="col">Nombre</th>
			      <th scope="col">Email</th>
			      <th scope="col">Teléfono</th>
			      <th scope="col">Rol</th>
  			    </tr>
			  </thead>
			  <tbody>`;


  listaUsuarios.forEach(oUsuario=>{
		texto = texto + `<tr>
				  <th scope="row">${oUsuario.docIdentidad}</th>
				  <td>${oUsuario.nombre}</td>
				  <td>${oUsuario.email}</td>
				  <td>${oUsuario.telefono}</td>
				  <td>${oUsuario.rol}</td>
				</tr>`;
	});

  	texto = texto + "</tbody>"+
					"</table>";
	return texto;
});

hbs.registerHelper('selectUsuarios',() =>{
	
	listaUsuarios = funciones.listUsuarios();

 let texto=`<select class="form-control form-control-lg" id="listUsuarios" name="docIdentidad" required>
			        <option value="">Seleccione un Usuario</option>`;

listaUsuarios.forEach(oUsuario=>{
  	if(oUsuario.rol == 'Docente' || oUsuario.rol == 'Aspirante'){
  		texto = texto + `<option value="${oUsuario.docIdentidad}">${oUsuario.nombre}</option>`;
  	}
});

  	texto = texto + "</select>";
	return texto;
});

hbs.registerHelper('verlistaUsuarios',() =>{
	
	listaUsuarios = funciones.listUsuarios();

   let texto = ``;

   listaUsuarios.forEach(oUsuario=>{
  	texto= texto +`<div class="col-sm-12 col-lg-12 mt-2">
							<div class="accordion" id="accordionCursos${oUsuario.docIdentidad}">
								  <div class="card">
									    <div class="card-header" id="${oUsuario.docIdentidad}">
										    	<p>
										    		Nombre : ${oUsuario.nombre}<br>
										    		Valor : $${oCurso.valor}
										    	</p>
										    	<hr>
										      <h2 class="mb-0">
										      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${oUsuario.docIdentidad}" aria-expanded="true" aria-controls="collapse${oUsuario.docIdentidad}">
										          Mas Información
										       </button>
										      </h2>
									    </div>

								       <div id="collapse${oUsuario.docIdentidad}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCursos${oUsuario.docIdentidad}">
									      <div class="card-body">
										      	<ul class="list-group">
												  <li class="list-group-item"><strong>Descripción :</strong> ${oCurso.descripcion}</li>
												  <li class="list-group-item"><strong>Modalidad :</strong> ${oCurso.modalidad}</li>
												  <li class="list-group-item"><strong>Intensidad horaria :</strong> ${oCurso.intensidadHoraria}</li>
												  <li class="list-group-item"><strong>Valor :</strong> $${oCurso.valor}</li>
												</ul>
											</div>					        
								      </div>
								    </div>
							 </div>
					</div>`;
  	
});
return texto;
});

hbs.registerHelper('selectActualizar',() =>{
	
	listaUsuarios = funciones.listUsuarios();

 let texto=`<select class="form-control form-control-lg" id="listUsuarios" name="docIdentidad" required>
			        <option value="">Seleccione un Usuario</option>`;

listaUsuarios.forEach(oUsuario=>{
  	texto = texto + `<option value="${oUsuario.docIdentidad}">${oUsuario.nombre}</option>`;
});

  	texto = texto + "</select>";
	return texto;
});