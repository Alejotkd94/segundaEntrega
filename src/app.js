const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const funciones = require('./funciones');
 // prueba

require('./helpers/helper');

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../template/partials');
const dirNode_modules = path.join(__dirname, '../node_modules');

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'hbs');

app.get('/',(req, res)=>{
	res.render('../template/views/index', {
		titulo : 'Inicio'
	});
});

app.get('/crearCurso', (req, res)=>{
	res.render('../template/views/crearCurso',{
		titulo : 'Registrar curso'
	});
});

app.post('/RegistarCurso', (req, res)=>{

	let curso={
		idCurso : parseInt(req.body.idCurso),
		nombreCurso: req.body.nombreCurso,
		modalidad: req.body.modalidad,
		valor: parseInt(req.body.valor),
		descripcion: req.body.descripcion,
		intensidadHoraria: parseInt(req.body.intensidadHoraria)
	};

	let Registrar =(curso,callback) => {
		let resultado = funciones.crearCurso(curso);
	 	callback(resultado);
	}

	Registrar(curso,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: 'Ya existe un curso registado con el mismo Id.',
				regresar : '/crearCurso'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de registrar el curso.',
				regresar : '/crearCurso'});
			break;

			default:
				res.render('../template/views/exito',{
				mensaje: 'El curso se registro correctamente.',
				regresar : '/crearCurso'});
			break;
		}
	});
});

app.get('/listarCursos', (req, res)=>{
	res.render('../template/views/listarCurso',{
		titulo : 'Administrar cursos'
	});
});

app.get('/VerCursos', (req, res)=>{
	res.render('../template/views/verCurso',{
		titulo : 'Lista cursos'
	});
});

app.post('/cambiarEstado', (req, res)=>{

	let idCurso = parseInt(req.body.idCurso);

	let actualizar =(idCurso,callback) => {
		let resultado = funciones.actualizar(idCurso);
	 	callback(resultado);
	}

	actualizar(idCurso,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de actualizar el estado del curso.',
				regresar : '/listarCursos'});
			break;

			case '-3':
				res.render('../template/views/error',{
				mensaje: 'No se encontro el curso ha actualizar.',
				regresar : '/listarCursos'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento almacenar el estado del curso.',
				regresar : '/listarCursos'});
			break;

			default:
				res.render('../template/views/listarCurso',{
					titulo : 'lista cursos'
				});
			break;
		}
	});
});

app.get('/inscribir', (req, res)=>{
	res.render('../template/views/inscripcion',{
		titulo : 'Inscribir curso'
	});
});

app.post('/InscribirCurso', (req, res)=>{

	let inscripcion={
		idCurso : parseInt(req.body.idCurso),
		nombre: req.body.nombre,
		docIdentidad: parseInt(req.body.docIdentidad),
		email: req.body.email,
		telefono: parseInt(req.body.telefono)
	};

	let Inscripcion =(inscripcion,callback) => {
		let resultado = funciones.Inscripcion(inscripcion);
	 	callback(resultado);
	}

	Inscripcion(inscripcion,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: `El estudiante ${inscripcion.nombre} ya se encuentra registrado en este curso.`,
				regresar : '/inscribir'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de registrar la inscripción al curso.',
				regresar : '/inscribir'});
			break;

			default:
				res.render('../template/views/exito',{
				mensaje: `El estudiante ${inscripcion.nombre} se registro corectamente en el curso.`,
				regresar : '/inscribir'});
			break;
		}
	});
});


app.post('/eliminarAspirante', (req, res)=>{

	let aspirante={
		idCurso : parseInt(req.body.idCurso),
		docIdentidad: parseInt(req.body.docIdentidad),
	};
		
	let EliminarAspirante =(aspirante,callback) => {
		let resultado = funciones.eliminarAspirante(aspirante);
	 	callback(resultado);
	}

	EliminarAspirante(aspirante,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: `Se presento un error al tratar de eliminar el aspirante.`,
				regresar : '/listarInsctritos'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de actualizar la lista de aspirantes.',
				regresar : '/listarInsctritos'});
			break;

			case '-3':
				res.render('../template/views/error',{
				mensaje: 'No se logro encontrar el aspirante en la lista de cursos.',
				regresar : '/listarInsctritos'});
			break;

			default:
				res.render('../template/views/exito',{
				mensaje: `El aspirante se elimino corectamente del curso.`,
				regresar : '/listarInsctritos'});
			break;
		}
	});
});


app.get('/listarInsctritos', (req, res)=>{
	res.render('../template/views/listarInscritos',{
		titulo : 'Lista inscritos'
	});
});

app.get('/listarUsuarios', (req, res)=>{
	res.render('../template/views/listarUsuarios',{
		titulo : 'Lista Usuarios'
	});
});

app.post('/cambiarRol', (req, res)=>{

	let docIdentidad = parseInt(req.body.docIdentidad);

	let actualizarRol =(docIdentidad,callback) => {
		let resultado = funciones.actualizarRol(docIdentidad);
	 	callback(resultado);
	}

	actualizarRol(docIdentidad,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de actualizar el rol del usuario.',
				regresar : '/listarUsuarios'});
			break;

			case '-3':
				res.render('../template/views/error',{
				mensaje: 'No se encontro el usuario a actualizar.',
				regresar : '/listarUsuarios'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de almacenar el rol del usuario.',
				regresar : '/listarUsuarios'});
			break;

			default:
				res.render('../template/views/listarUsuarios',{
				titulo : 'lista usuarios'});
			break;
		}
	});
});

app.get('/actualizarUsuarios', (req, res)=>{
	res.render('../template/views/actualizarUsuarios',{
		titulo : 'Actualizar Usuarios'
	});
});

app.post('/actualizarDatos', (req, res)=>{

	let doc = parseInt(req.body.docIdentidad);
	let nom = req.body.nombre;
	let mail = req.body.email;
	let tel = parseInt(req.body.telefono);

	let actualizarUsuario =(doc,nom,mail,tel,callback) => {
		let resultado = funciones.actualizarUsuario(doc,nom,mail,tel);
	 	callback(resultado);
	}

	actualizarUsuario(doc,nom,mail,tel,function(resultado){

		switch(resultado){
			case '-1':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de actualizar los datos del usuario.',
				regresar : '/actualizarUsuarios'});
			break;

			case '-3':
				res.render('../template/views/error',{
				mensaje: 'No se encontro el usuario a actualizar.',
				regresar : '/actualizarUsuarios'});
			break;

			case '-2':
				res.render('../template/views/error',{
				mensaje: 'Se presento un error al momento de almacenar los datos del usuario.',
				regresar : '/actualizarUsuarios'});
			break;

			default:
				res.render('../template/views/listarUsuarios',{
				titulo : 'actualizacion usuarios'});
			break;
		}
		});
});

app.get('*',(req, res)=>{
	res.render('../template/views/error',{
		mensaje: 'Error 404.',
		regresar : '/'});
});

app.listen(3000,()=>{
	console.log('Escuchando en el puerto 3000');
});

