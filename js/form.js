var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click',function(event){
	event.preventDefault();

	var form = document.querySelector('#form-adiciona');
	//extraindo informações do paciente do form
	var paciente =obtemPacienteDoFormulario(form);

	//console.log(paciente);

	//cria a tr do paciente



var erros = validaPaciente(paciente);

console.log(erros);
if (erros.length > 0){
		exibeMensagensDeErro(erros);

		return
}

adicionaPacienteNaTabela(paciente);


		form.reset();
		var mensagensErro =  document.querySelector("#mensagens-erro");
		mensagensErro.innerHTML = '';
});

function adicionaPacienteNaTabela(paciente){
	var pacienteTr = montaTr(paciente);
	//adicionando o paciente na tabela
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
	var ul = document.querySelector("#mensagens-erro");
		ul.innerHTML ='';
		erros.forEach(function(erro){
			var li = document.createElement('li');
			li.textContent = erro;
			ul.appendChild(li);
		});
}
function obtemPacienteDoFormulario(form){

	var paciente = {
		nome : form.nome.value,
		peso : form.peso.value,
		altura :  form.altura.value,
		gordura : form.gordura.value,
		imc : calculaImc( form.peso.value,form.altura.value)
	}

	return paciente;
}

function montaTr(paciente){
	//cria a tr e a td do paciente
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");



	var nomeTd = montaTd(paciente.nome,'info-nome');


	var pesoTd = montaTd(paciente.peso,'info-peso');

	var alturaTd = montaTd(paciente.altura,'info-altura');

	var gorduraTd = montaTd(paciente.gordura,'info-gordura');

	var imcTd = montaTd(paciente.imc,'info-imc');


	nomeTd.textContent = paciente.nome;
	pesoTd.textContent = paciente.peso;
	alturaTd.textContent = paciente.altura;
	gorduraTd.textContent = paciente.gordura;
	imcTd.textContent =paciente.imc;

	pacienteTr.appendChild(nomeTd);
	pacienteTr.appendChild(pesoTd);
	pacienteTr.appendChild(alturaTd);
	pacienteTr.appendChild(gorduraTd);
	pacienteTr.append(imcTd);

	return pacienteTr
}

function montaTd(dado,classe){
	var td = document.createElement("td");
	td.textContent = dado;
	td.classList.add(classe);
	return td;
}

function validaPaciente(paciente){
		var erros = [];

		if(paciente.nome.length ==0) erros.push("O nome não pode ser em branco")

		if (!validaPeso(paciente.peso))	erros.push('Peso é Invalido');

		if(!validaAltura(paciente.altura)) {
			erros.push("Altura é Iválido")
		}

		if(paciente.gordura.length == 0 ) erros.push("A gordura não pode ser em branco");

		if (paciente.peso.length == 0) erros.push("O peso não pode ser em branco");

		if(paciente.altura.length == 0) erros.push("A altura não pode ser em branco")

		return erros;
}
