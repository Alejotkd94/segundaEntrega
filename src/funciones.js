const fs = require('fs');
listaEstudiantes =[];
listaCursos =[];

const crearCurso = (curso) => {
	let result = '1';
	listarCurso();

	let oCurso={		
		idCurso : curso.idCurso,
		nombreCurso: curso.nombreCurso,
		modalidad: curso.modalidad,
		valor: curso.valor,
		descripcion: curso.descripcion,
		intensidadHoraria: curso.intensidadHoraria,
		estado:'Habilitado'
	};

	let duplicado = listaCursos.find(x => x.idCurso == curso.idCurso);

	if(!duplicado){
		listaCursos.push(oCurso);

		let datos = JSON.stringify(listaCursos);

		fs.writeFile('listadoCursos.json', datos, (err)=>{
			if(err){
				result = '-2';
			} 
		});

	}else{
		result = '-1';
	}
	return result;
}

const Inscripcion = (inscripcion) => {
	let result = '1';
	listarInscripcion();

	let oInscripcion={		
		idCurso : inscripcion.idCurso,
		nombre: inscripcion.nombre,
		docIdentidad: inscripcion.docIdentidad,
		email: inscripcion.email,
		telefono: inscripcion.telefono
	};

	let duplicado = listaEstudiantes.find(x => x.docIdentidad == inscripcion.docIdentidad && x.idCurso == inscripcion.idCurso);

	if(!duplicado){
		listaEstudiantes.push(oInscripcion);

		let datos = JSON.stringify(listaEstudiantes);

		fs.writeFile('listadoEstudiante.json', datos, (err)=>{
			if(err){
				result = '-2';
			}else{
				result = '1';
			} 
		});

	}else{
		result = '-1';
	}
	return result;
}


const listCurso = () =>{
	try{
		// listaCursos = require('./listadoCursos.json');
		listaCursos= JSON.parse(fs.readFileSync('listadoCursos.json'));
	}catch(Error){
		listaCursos =[];
	}
	return listaCursos;
}

const listarCurso = () =>{
	try{
		// listaCursos = require('./listadoCursos.json');
		listaCursos= JSON.parse(fs.readFileSync('listadoCursos.json'));
	}catch(Error){
		listaCursos =[];
	}
}

const listarInscripcion = () =>{
	try{
		//listaEstudiantes = require('./listadoEstudiante.json');
		listaEstudiantes= JSON.parse(fs.readFileSync('listadoEstudiante.json'))

	}catch(Error){
		listaEstudiantes =[];
	}
}

const listInscripcion = () =>{
	try{
		//listaEstudiantes = require('./listadoEstudiante.json');
		listaEstudiantes= JSON.parse(fs.readFileSync('listadoEstudiante.json'))

	}catch(Error){
		listaEstudiantes =[];
	}
	return listaEstudiantes;
}

const actualizar=(idCurso)=>{
	let result = '1';
	listarCurso();

	let oCurso = listaCursos.find(buscar => buscar.idCurso == idCurso);

	if(!oCurso)
		result = '-3';
	else{
		oCurso['estado'] = 'Desabilitado';

		let datos = JSON.stringify(listaCursos);

		fs.writeFile('listadoCursos.json', datos, (err)=>{
			if(err){
				result = '-2';
			}
		})
	}

	return result;
}

const eliminarAspirante=(aspirante)=>{
	let result = '1';

	listarInscripcion();

	//Lista cursos mismo estudiante
	let nuevo = listaEstudiantes.filter(est => est.docIdentidad == aspirante.docIdentidad && est.idCurso != aspirante.idCurso);

	//lista curso demas estudiantes
	let otrosEstuduantes = listaEstudiantes.filter(est => est.docIdentidad != aspirante.docIdentidad);


	console.log(nuevo);
	console.log(otrosEstuduantes);

	if(nuevo.length == listaEstudiantes.length){
		result = '-3';
	}else{
		listaEstudiantes = otrosEstuduantes;
		nuevo.forEach(oEst=>{
			listaEstudiantes.push(oEst);
		});

		let datos = JSON.stringify(listaEstudiantes);

		fs.writeFile('listadoEstudiante.json', datos, (err)=>{
			if(err){
				result = '-2';
			}
		});
	}
    console.log(listaEstudiantes);

	return result;
}


module.exports ={
	crearCurso,
	actualizar,
	listCurso,
	Inscripcion,
	listInscripcion,
	eliminarAspirante
}