import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatUserCount } from '../../utils/format-count';

export const OverviewSingleAnk = (props) => {
    const { difference, positive = false, sx, value, color } = props;
    const navigate = useNavigate();
    return (
        <Card sx={sx} onClick={() => navigate('/users')}>
            <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
                <Stack
                    alignItems="center"
                    direction="row"
                    textAlign='center'
                    justifyContent="center"
                >
                    <Typography
                        color="#556ee6"
                        variant="overline"
                    >
                        Total Bids {value.totalBids.toString()}
                    </Typography>
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    textAlign='center'
                    justifyContent="center"
                >
                    <Stack spacing={1}>
                        <Typography variant="h4">
                            {formatUserCount(value.totalPoints)}
                        </Typography>
                        <Typography
                            color="text.primary"
                            variant="overline"
                        >
                            Total Bid Amount
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent='center'
                    spacing={2}
                    sx={{ backgroundColor: color }}
                >
                    <Typography
                        color="white"
                        variant="caption"
                    >
                        Ank 0
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

OverviewSingleAnk.propTypes = {
    difference: PropTypes.number,
    positive: PropTypes.bool,
    value: PropTypes.string.isRequired,
    sx: PropTypes.object
};

