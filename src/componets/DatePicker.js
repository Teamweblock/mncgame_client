
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

const Datepicker = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [error, setError] = useState(null);

    const today = dayjs();

    const validateRange = (range) => {
        const [start, end] = range;
        if (start && start.isAfter(today, 'day')) {
            setError('Start date cannot be in the future.');
            return false;
        }
        if (end && (end.isBefore(start, 'day') || end.isAfter(today, 'day'))) {
            setError('End date must be after or equal to the start date and not in the future.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleChange = (newRange) => {
        if (validateRange(newRange)) {
            setDateRange(newRange);
        }
    };

    const shortcutsItems = [
        {
            label: 'This Week',
            getValue: () => {
                const startOfWeek = today.startOf('week');
                return [startOfWeek.isAfter(today) ? today : startOfWeek, today];
            },
        },
        {
            label: 'Last Week',
            getValue: () => {
                const lastWeekStart = today.subtract(7, 'day').startOf('week');
                const lastWeekEnd = today.subtract(7, 'day').endOf('week');
                return [
                    lastWeekStart.isAfter(today) ? today : lastWeekStart,
                    lastWeekEnd.isAfter(today) ? today : lastWeekEnd,
                ];
            },
        },
        {
            label: 'Last 7 Days',
            getValue: () => {
                const last7DaysStart = today.subtract(7, 'day');
                return [last7DaysStart, today];
            },
        },
        {
            label: 'Current Month',
            getValue: () => {
                const startOfMonth = today.startOf('month');
                return [startOfMonth.isAfter(today) ? today : startOfMonth, today];
            },
        },
        {
            label: 'Reset',
            getValue: () => [null, null],
        },
    ];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateRangePicker
                value={dateRange}
                onChange={handleChange}
                minDate={null} // Allow selection of past dates
                maxDate={today} // Restrict to today or earlier
                slotProps={{
                    shortcuts: {
                        items: shortcutsItems,
                    },
                    textField: {
                        helperText: error,
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default Datepicker;

// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers/DateRangePicker';
// import { Box, Button, TextField, Typography } from '@mui/material';

// const Datepicker = () => {
//     const [dateRange, setDateRange] = useState([null, null]);
//     const [error, setError] = useState(null);

//     const today = dayjs();

//     // Function to validate the selected date range
//     const validateRange = (range) => {
//         const [start, end] = range;
//         if (start && start.isAfter(today, 'day')) {
//             setError('Start date cannot be in the future.');
//             return false;
//         }
//         if (end && (end.isBefore(start, 'day') || end.isAfter(today, 'day'))) {
//             setError('End date must be after or equal to the start date and not in the future.');
//             return false;
//         }
//         setError(null);
//         return true;
//     };

//     // Handle date range change
//     const handleChange = (newRange) => {
//         if (validateRange(newRange)) {
//             setDateRange(newRange);
//         }
//     };

//     // Shortcut options
//     const shortcutsItems = [
//         {
//             label: 'This Week',
//             getValue: () => {
//                 const startOfWeek = today.startOf('week');
//                 return [startOfWeek.isAfter(today) ? today : startOfWeek, today];
//             },
//         },
//         {
//             label: 'Last Week',
//             getValue: () => {
//                 const lastWeekStart = today.subtract(7, 'day').startOf('week');
//                 const lastWeekEnd = today.subtract(7, 'day').endOf('week');
//                 return [
//                     lastWeekStart.isAfter(today) ? today : lastWeekStart,
//                     lastWeekEnd.isAfter(today) ? today : lastWeekEnd,
//                 ];
//             },
//         },
//         {
//             label: 'Last 7 Days',
//             getValue: () => {
//                 const last7DaysStart = today.subtract(7, 'day');
//                 return [last7DaysStart, today];
//             },
//         },
//         {
//             label: 'Current Month',
//             getValue: () => {
//                 const startOfMonth = today.startOf('month');
//                 return [startOfMonth.isAfter(today) ? today : startOfMonth, today];
//             },
//         },
//         {
//             label: 'Reset',
//             getValue: () => [null, null],
//         },
//     ];

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
//                 {/* Display error if any */}
//                 {error && (
//                     <Typography color="error" variant="body2">
//                         {error}
//                     </Typography>
//                 )}

//                 {/* Date Range Picker */}
//                 <DateRangePicker
//                     calendars={2} // Mimics a static display with 2 months
//                     value={dateRange}
//                     onChange={handleChange}
//                     renderInput={(startProps, endProps) => (
//                         <Box sx={{ display: 'flex', gap: 2 }}>
//                             <TextField {...startProps} label="Start Date" />
//                             <TextField {...endProps} label="End Date" />
//                         </Box>
//                     )}
//                 />

//                 {/* Shortcut Buttons */}
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                     {shortcutsItems.map((shortcut, index) => (
//                         <Button
//                             key={index}
//                             variant="outlined"
//                             onClick={() => handleChange(shortcut.getValue())}
//                         >
//                             {shortcut.label}
//                         </Button>
//                     ))}
//                 </Box>
//             </Box>
//         </LocalizationProvider>
//     );
// };

// export default Datepicker;

