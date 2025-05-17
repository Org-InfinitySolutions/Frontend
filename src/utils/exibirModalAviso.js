
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const exibirAviso = (mensagem, tipo) => {
    Swal.fire({
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#000'
    })
}

const exibirAvisoTokenExpirado = () => {
    const navegar = useNavigate();
    exibirAviso('O token expirou, por favor refaça o login', 'error');
    
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
        timer: 2000
    })
}

export { exibirAviso, exibirAvisoTokenExpirado, exibirAvisoTimer }