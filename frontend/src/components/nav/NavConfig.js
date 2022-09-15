import Iconify from '../Iconify';

const ICON_SIZE = 22;
const getIcon = (name) => <Iconify icon={name} width={ICON_SIZE} height={ICON_SIZE} />;

const NAV_CONFIG = [
  {
    title: 'dashboard',
    path: '/',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'profile',
    path: '/profile',
    icon: getIcon('mdi:account-circle')
  }
];

export default NAV_CONFIG;
