import PropTypes from 'prop-types';
import ArchiveBoxArrowDownIcon from '@heroicons/react/24/solid/ArchiveBoxArrowDownIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewTotalDeposit = (props) => {
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
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                            variant="overline"
                        >
                            Today Deposit
                        </Typography>
                        <Typography variant="h4">
                            ₹{value}
                        </Typography>
                    </Stack>
                    <Avatar
                        sx={{
                            backgroundColor: 'info.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <SvgIcon>
                            <ArchiveBoxArrowDownIcon />
                        </SvgIcon>
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
};

OverviewTotalDeposit.propTypes = {
    value: PropTypes.string,
    sx: PropTypes.object
};
