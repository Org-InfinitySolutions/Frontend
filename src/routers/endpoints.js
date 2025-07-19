export const ENDPOINTS = {
    // ApiAutenticacao //
    // Reset de Senha
    RESETSENHASOLICITAR: '/reset-senha/solicitar',
    RESETSENHACONFIRMAR: '/reset-senha/confirmar',

    // Auth
    LOGIN: '/login',
    EMAILVERIFICAR: '/email/verificar',
    CREDENCIAISIDUSUARIO: '/credenciais/:id',
    
    // Credenciais
    CREDENCIAISSENHA: '/credenciais/senha',
    CREDENCIAISEMAIL: '/credenciais/email',
    
    // Api //
    // Usuários
    USUARIOID: '/usuarios/:id',
    USUARIOS: '/usuarios',
    CRIARUSUARIO: '/usuarios',
    GETUSUARIORG: '/usuarios/rg',
    GETUSUARIOCPF: '/usuarios/cpf',
    GETUSUARIOCNPJ: '/usuarios/cnpj',

    // Documentos
    POSTDOCUMENTO: '/usuarios/documentos/:id',

    // Categorias
    CATEGORIAID: '/categorias/:id',
    CATEGORIAS: '/categorias',

    // Dashboard
    KPIEVENTOPOPULAR: '/dashboard/kpi/tipo-evento-popular',
    KPITEMPOMEDIOATENDIMENTO: '/dashboard/kpi/tempo-medio-atendimento',
    KPICATEGORIAPOPULAR: '/dashboard/kpi/categoria-popular',
    GRAFICOPEDIDOSMES: '/dashboard/pedidos-por-mes',
    GRAFICOEQUIPAMENTOSPOPULARES: '/dashboard/grafico/equipamentos-populares',
    GRAFICOSCOMPLETO: '/dashboard/completo',

    // Produtos
    PRODUTOS: '/produtos',
    PRODUTOID: '/produtos/:id',
    PUTIMAGEMPRODUTO: '/produtos/:id/imagem',

    // Pedidos
    PEDIDOS: '/pedidos',
    PEDIDOID: '/pedidos/:id',
    PUTSITUACAOPEDIDO: '/pedidos/:id/situacao',

    // Emails
    VALIDARCODIGOEMAIL: '/emails/validar-codigo',
    ENVIARCODIGOEMAIL: '/emails/enviar-codigo'
}