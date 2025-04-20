
import Swal from 'sweetalert2';

const exibirAviso = (mensagem, tipo) => {
    document.activeElement?.blur();
    Swal.fire({
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#000'
    })
}

export { exibirAviso }