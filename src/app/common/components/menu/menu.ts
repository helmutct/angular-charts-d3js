export const menuItems = [
  {
    title: 'Dashboard',
    routerLink: '/dashboard',
    icon: 'fas fa-home',
    selected: false,
    expanded: false,
    order: 0,
    roles: [ 'ALL' ],
  },
  {
    title: 'Alertas beneficiário',
    routerLink: '/facial',
    icon: 'fas fa-diagnoses',
    selected: false,
    expanded: false,
    order: 70,
    roles: [ 'ALL' ],
  },
  {
    title: 'Alertas prestador',
    routerLink: '/saude/investigacoes',
    icon: 'fas fa-user-secret',
    selected: false,
    expanded: false,
    order: 50,
    roles: [ 'ALL' ],
  },
  {
    title: 'Histórico',
    routerLink: '/saude/historico',
    icon: 'fas fa-history',
    selected: false,
    expanded: false,
    order: 60,
    roles: [ 'ALL' ],
  }
];
