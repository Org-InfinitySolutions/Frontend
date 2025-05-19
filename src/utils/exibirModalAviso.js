
import Swal from 'sweetalert2';
import { limparSession } from './limpar';

const exibirAviso = (mensagem, tipo) => {
    Swal.fire({
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#000'
    })
}

const exibirAvisoTokenExpirado = (navegar) => {
    exibirAvisoTimer('A sessão expirou, por favor refaça o login', 'error');

    setTimeout(() => {
        limparSession();
        navegar('/login')
    }, 3000);
}

const exibirAvisoTimer = (mensagem, tipo) => {
    Swal.fire({ 
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        showConfirmButton: false,
        timer: 3000
    })
}

export { exibirAviso, exibirAvisoTokenExpirado, exibirAvisoTimer }