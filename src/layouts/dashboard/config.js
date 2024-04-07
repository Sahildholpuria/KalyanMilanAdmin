import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import PuzzlePieceIcon from '@heroicons/react/24/solid/PuzzlePieceIcon';
import ArrowsRightLeftIcon from '@heroicons/react/24/solid/ArrowsRightLeftIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ScaleIcon from '@heroicons/react/24/solid/ScaleIcon';
import AcademicCapIcon from '@heroicons/react/24/solid/AcademicCapIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import NewspaperIcon from '@heroicons/react/24/solid/NewspaperIcon';
import PresentationChartBarIcon from '@heroicons/react/24/solid/PresentationChartBarIcon';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
import { SvgIcon } from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

export const items = [
  {
    title: 'Overview',
    path: '/home',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'User Management',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Game Management',
    path: '/games',
    icon: (
      <SvgIcon fontSize="small">
        <PuzzlePieceIcon />
      </SvgIcon>
    ),
    // Example of dropdown items
    children: [
      {
        title: 'Game Name',
        path: '/games',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Game Rates',
        path: '/games/rates',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <CurrencyRupeeIcon />
          </SvgIcon>
        )
      },
    ]
  },
  {
    title: 'Game & Numbers',
    path: '/game',
    icon: (
      <SvgIcon fontSize="small">
        <PuzzlePieceIcon />
      </SvgIcon>
    ),
    // Example of dropdown items
    children: [
      {
        title: 'Single Digit',
        path: '/game/singledigit',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Jodi Digit',
        path: '/game/jodidigit',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Single Pana',
        path: '/game/singlepana',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Double Pana',
        path: '/game/doublepana',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Tripple Pana',
        path: '/game/tripplepana',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Half Sangam',
        path: '/game/halfsangam',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Full Sangam',
        path: '/game/fullsangam',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <PlayIcon />
          </SvgIcon>
        )
      },
    ]
  },
  {
    title: 'Report Management',
    path: '/report',
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
    // Example of dropdown items
    children: [
      {
        title: 'Bid History',
        path: '/bids',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <ScaleIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Bid Win Report',
        path: '/bidwin',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <ScaleIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Winning Report',
        path: '/winning',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <AcademicCapIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Withdraw Report',
        path: '/withdrawreport',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <ArrowsRightLeftIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Auto Deposit History',
        path: '/autodeposit',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <ArrowsRightLeftIcon />
          </SvgIcon>
        )
      },
    ]
  },
  {
    title: 'Wallet Management',
    path: '/withdraw',
    icon: (
      <SvgIcon fontSize="small">
        <WalletIcon />
      </SvgIcon>
    ),
    // Example of dropdown items
    children: [
      {
        title: 'Add Fund',
        path: '/addfund',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <PlusIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Withdraw Request',
        path: '/withdraw',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame1 */}
            <ArrowsRightLeftIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Bid Revert',
        path: '/bid',
        icon: (
          <SvgIcon fontSize="small">
            {/* Add icon for subgame2 */}
            <ScaleIcon />
          </SvgIcon>
        )
      },
    ]
  },
  // {
  //   title: 'Withdraw Management',
  //   path: '/withdraw',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ArrowsRightLeftIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Bid History',
  //   path: '/bids',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ScaleIcon />
  //     </SvgIcon>
  //   )
  // },
  // 
  // },
  // {
  //   title: 'Winning History',
  //   path: '/winning',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <AcademicCapIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Winning Prediction',
    path: '/prewinner',
    icon: (
      <SvgIcon fontSize="small">
        <AcademicCapIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Declare Result',
    path: '/result',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Send Notification',
    path: '/send',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
