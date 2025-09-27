
import Swal from 'sweetalert2';
import { limparSession } from './limpar';
import { ROUTERS } from '../routers/routers';

const exibirAviso = (mensagem, tipo) => {
    Swal.fire({
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        confirmButtonText: 'Fechar',
        confirmButtonColor: '#000'
    })
}

// parâmtro 'navegar' é um React Hook, se não existir no arquivo você precisa criar
// Ex.: const navegar = useNavigate()
//      exibirAvisoLogin(navegar)
const exibirAvisoTokenExpirado = (navegar) => {
    exibirAvisoTimer('A sessão expirou, por favor refaça o login.', 'error');

    setTimeout(() => {
        limparSession();
        navegar(`${ROUTERS.LOGIN}`)
    }, 3000);
}

const exibirAvisoTimer = (mensagem, tipo, tempo) => {
    Swal.fire({ 
        text: mensagem,
        icon: tipo, /* 'success', 'error', 'warning', 'info' */
        showConfirmButton: false,
        timer: tempo || 3000
    })
}

// parâmtro 'navegar' é um React Hook, se não existir no arquivo você precisa criar
// Ex.: const navegar = useNavigate()
//      exibirAvisoLogin(navegar)
const exibirAvisoLogin = (navegar) => {
    Swal.fire({
        icon: 'info',
        title: 'Faça login!',
        text: 'Para finalizar a solicitação entre com sua conta. As informações do pedido serão salvas.',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Fazer login',
        confirmButtonColor: 'black'
    }).then((resposta) => {
        if(resposta.isConfirmed)
            navegar(`${ROUTERS.LOGIN}`)
    })
}

const exibirAvisoAcessoNegado = (navegar) => {
    exibirAvisoTimer('Você não tem permissão para acessar está página.', 'error');

    setTimeout(() => {
        navegar(`${ROUTERS.EQUIPAMENTOS}`);
    }, 3200);
}



export { exibirAviso, exibirAvisoTokenExpirado, exibirAvisoTimer, exibirAvisoLogin, exibirAvisoAcessoNegado }