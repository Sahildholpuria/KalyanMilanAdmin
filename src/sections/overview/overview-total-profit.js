import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Tooltip, Typography } from '@mui/material';
import { formatUserCount } from '../../utils/format-count';

export const OverviewTotalProfit = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1} sx={{ maxWidth: '50%' }}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Profit
            </Typography>
            <Tooltip title={formatUserCount(value)}>
              <Typography variant="h4" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                ₹{value}
              </Typography>
            </Tooltip>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
