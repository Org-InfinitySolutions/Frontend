document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cpf").addEventListener("input", formatarCPF);
    document.getElementById("cnpj").addEventListener("input", formatarCNPJ);
    document.getElementById("telefone").addEventListener("input", formatarTelefone);
    document.getElementById("registroGeral").addEventListener("input", formatarRegistroGeral);
    document.getElementById("btnEnviar").addEventListener("click", validarFormulario);
});

function formatarCPF() {
    let cpf = this.value.replace(/\D/g, '');
    if (cpf.length <= 3) {
        cpf = cpf.replace(/(\d{1,3})/g, '$1');
    } else if (cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    this.value = cpf;
}

function formatarCNPJ() {
    let cnpj = this.value.replace(/\D/g, '');
    if (cnpj.length <= 2) {
        cnpj = cnpj.replace(/(\d{2})/, '$1');
    } else if (cnpj.length <= 5) {
        cnpj = cnpj.replace(/(\d{2})(\d{3})/, '$1.$2');
    } else if (cnpj.length <= 8) {
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cnpj.length <= 12) {
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    } else {
        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    this.value = cnpj;
}

function formatarTelefone() {
    let telefone = this.value.replace(/\D/g, '');
    if (telefone.length <= 2) {
        telefone = telefone.replace(/(\d{2})/, '($1');
    } else if (telefone.length <= 7) {
        telefone = telefone.replace(/(\d{2})(\d{1,4})/, '($1) $2');
    } else {
        telefone = telefone.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3');
    }
    this.value = telefone;
}

function formatarRegistroGeral() {
    let registroGeral = this.value.replace(/\D/g, '');
    if (registroGeral.length <= 2) {
        registroGeral = registroGeral.replace(/(\d{2})/, '$1');
    } else if (registroGeral.length <= 5) {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    } else if (registroGeral.length <= 8) {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})(\d{1,3})/, '$1.$2.$3');
    } else {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1})/, '$1.$2.$3-$4');
    }
    this.value = registroGeral;
}

        function validarFormulario() {
            let cpf = document.getElementById('cpf').value;
            let cnpj = document.getElementById('cnpj').value;
            let telefone = document.getElementById('telefone').value;
            let registroGeral = document.getElementById('registroGeral').value;
            let email = document.getElementById('email').value;
          

            let cpfError = document.getElementById('cpf-error');
            let cnpjError = document.getElementById('cnpj-error');
            let telefoneError = document.getElementById('telefone-error');
            let registroGeralError = document.getElementById('registroGeral-error');
            let emailError = document.getElementById('email-error');

            cpfError.innerHTML = '';
            cnpjError.innerHTML = '';
            telefoneError.innerHTML = '';
            registroGeralError.innerHTML = '';
            emailError.innerHTML = '';

            let isValid = true;

            if (cpf.length > 0 && cpf.length < 14) {
                cpfError.innerHTML = 'CPF inválido. Verifique o formato.do';
                isValid = false;
            }

            if (cnpj.length > 0 && cnpj.length < 18) {
                cnpjError.innerHTML = 'CNPJ inválido. Verifique o formato.';
                isValid = false;
            }

            if (telefone.length > 0 && telefone.length < 15) {
                telefoneError.innerHTML = 'Telefone inválido. Verifique o formato.';
                isValid = false;
            }

            if (registroGeral.length > 0 && registroGeral.length < 11) {
                registroGeralError.innerHTML = 'RG inválido. Verifique o formato.';
                isValid = false;
            }

            if (cpf === "") {
                cpfError.innerHTML = 'Campo obrigatório';
                isValid = false;
            }

            if (cnpj === "") {
                cnpjError.innerHTML = 'Campo obrigatório';
                isValid = false;
            }

            if (telefone === "") {
                telefoneError.innerHTML = 'Campo obrigatório';
                isValid = false;
            }

            if (registroGeral === "") {
                registroGeralError.innerHTML = 'Campo obrigatório';
                isValid = false;
            }

            if (email === "") {
                emailError.innerHTML = 'Campo obrigatório';
                isValid = false;
            }
            else {
                
            let arrobaIndex = email.indexOf('@');
            let pontoIndex = email.indexOf('.', arrobaIndex);

            if (arrobaIndex === -1 || pontoIndex === -1 || pontoIndex < arrobaIndex) {
                emailError.innerHTML = 'E-mail inválido. Verifique o formato.';
                isValid = false;
            }
        }
        if(isValid){
            enviarDados();
        }
    }
   
function enviarDados() {
    let usuario = {
        cpf: document.getElementById("cpf").value,
        cnpj: document.getElementById("cnpj").value,
        telefone: document.getElementById("telefone").value,
        registroGeral: document.getElementById("registroGeral").value,
        email: document.getElementById("email").value
    };

    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuário cadastrado com sucesso:", data);
        alert("Usuário cadastrado com sucesso!");
    })
}

