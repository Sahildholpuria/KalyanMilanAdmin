// import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNProgress } from '../../hooks/use-nprogress';
import { useState } from 'react';
import ExpandLess from '@heroicons/react/24/solid/ChevronUpIcon';
import ExpandMore from '@heroicons/react/24/solid/ChevronDownIcon';

export const SideNavItem = (props) => {
  const customNavigate = useNProgress();

  const handleNavigate = (to) => {
    customNavigate(to);
    setOpen(false); // Close the dropdown if open
  };
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const { active = false, disabled, external, icon, path, title, children } = props;
  const childPathActive = children && children.some((child) => child.path === pathName);
  const [open, setOpen] = useState(false);
  const handleToggleDropdown = () => {
    setOpen(!open);
  };
  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: 'NextLink',
        href: path
      }
    : {};
  // console.log(linkProps)
  return (
    <li>
      {children ? (
        <>
          <ButtonBase
            // {...linkProps}
            disabled={disabled}
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              pl: '16px',
              pr: '16px',
              py: '6px',
              textAlign: 'left',
              width: '100%',
              // ...(childPathActive && {
              //   backgroundColor: 'rgba(255, 255, 255, 0.04)'
              // }),
              // '&:hover': {
              //   backgroundColor: 'rgba(255, 255, 255, 0.04)'
              // }
            }}
            onClick={handleToggleDropdown}
          >
            {icon && (
              <Box
                component="span"
                sx={{
                  alignItems: 'center',
                  color: 'neutral.400',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  mr: 2,
                  ...(childPathActive && {
                    color: 'primary.main'
                  })
                }}
              >
                {icon}
              </Box>
            )}
            <Box
              component="span"
              sx={{
                color: 'neutral.400',
                flexGrow: 1,
                fontFamily: (theme) => theme.typography.fontFamily,
                fontSize: 14,
                fontWeight: 600,
                mr: 4,
                lineHeight: '24px',
                whiteSpace: 'nowrap',
                ...(childPathActive && {
                  color: 'common.white'
                }),
                ...(disabled && {
                  color: 'neutral.500'
                })
              }}
            >
              {title}
            </Box>
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(childPathActive && {
                  color: 'primary.main'
                })
              }}
            >
              <SvgIcon fontSize="small">
                {open ? <ExpandLess /> : <ExpandMore />}
              </SvgIcon>
            </Box>
          </ButtonBase>
          <List sx={{ display: open ? 'block' : 'none', pt: '4px' }}>
            {children.map((child) => (
              <ListItem
                key={child.title}
                // button
                onClick={() => handleNavigate(child.path)}
                sx={{
                  pl: '32px', // Adjust indentation for nested items
                  pt: '2px',
                  pb: '2px',
                  mb: child.title !== 'Game Rates' ? '4px' : 0,
                  cursor: 'pointer',
                  borderRadius: 1,
                  ...(child.path === pathName && {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }),
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)'
                  }
                }}
              >
                {child.icon && (
                  <ListItemIcon sx={{
                    color: 'neutral.400', minWidth: '40px', ...(child.path === pathName && {
                      color: 'primary.main'
                    })
                  }}>
                    {child.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={child.title} sx={{
                  '& .css-1r5ssmh': {
                    color: 'neutral.400',
                    flexGrow: 1,
                    fontFamily: (theme) => theme.typography.fontFamily,
                    fontSize: 14,
                    fontWeight: 600,
                    mr: 4,
                    lineHeight: '24px',
                    whiteSpace: 'nowrap',
                    ...(child.path === pathName && {
                      color: 'common.white'
                    }),
                  },
                }} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <ButtonBase
          // {...linkProps}
          disabled={disabled}
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
          onClick={() => handleNavigate(path)}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main'
                })
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              flexGrow: 1,
              fontFamily: (theme) => theme.typography.fontFamily,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              ...(active && {
                color: 'common.white'
              }),
              ...(disabled && {
                color: 'neutral.500'
              })
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
