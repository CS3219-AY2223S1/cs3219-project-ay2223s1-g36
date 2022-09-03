import Iconify from '../Iconify';

const ICON_SIZE = 22;
const getIcon = (name) => <Iconify icon={name} width={ICON_SIZE} height={ICON_SIZE} />;

const NAV_CONFIG = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  }
];

export default NAV_CONFIG;
