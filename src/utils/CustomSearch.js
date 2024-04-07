import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const CustomSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query); // Notify the parent component about the search query
    };
    return (
        <Card sx={{ p: 1 }}>
            <OutlinedInput
                // defaultValue=""
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                placeholder="Search"
                startAdornment={(
                    <InputAdornment position="start">
                        <SvgIcon
                            color="action"
                            fontSize="small"
                        >
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    </InputAdornment>
                )}
                sx={{ maxWidth: 500 }}
            />
        </Card>
    )
};

CustomSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};