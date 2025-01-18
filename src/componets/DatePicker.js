// import React, { useState } from "react";
// import DatepickerApp from "react-tailwindcss-datepicker";

// const Datepicker = () => {
//     const [value, setValue] = useState({
//         startDate: null,
//         endDate: null
//     });

//     return (
//         <DatepickerApp
//             value={value}
//             onChange={newValue => setValue(newValue)}
//             showShortcuts={true}
//         />
//     );
// };

// export default Datepicker;

// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { DateTimePickerToolbar } from '@mui/x-date-pickers/DateTimePicker';

// const Datepicker = () => {
//     const [dateRange, setDateRange] = useState([null, null]);
//     const [error, setError] = useState(null);

//     const today = dayjs();

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

//     const handleChange = (newRange) => {
//         if (validateRange(newRange)) {
//             setDateRange(newRange);
//         }
//     };

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
//             <StaticDateRangePicker
//                 value={dateRange}
//                 onChange={handleChange}
//                 minDate={null} // Allow selection of past dates
//                 maxDate={today} // Restrict to today or earlier
//                 slotProps={{
//                     shortcuts: {
//                         items: shortcutsItems,
//                     },
//                     textField: {
//                         helperText: error,
//                     },
//                 }}
//             />
//         </LocalizationProvider>
//     );
// };

// export default Datepicker;

// import React, { useState } from "react";

// const DatePicker = () => {
//   const [selectedRange, setSelectedRange] = useState({
//     startDate: null,
//     endDate: null,
//   });

//   // Helper functions to calculate ranges
//   const calculateRanges = () => {
//     const today = new Date();
//     const weekStart = new Date(
//       today.setDate(today.getDate() - ((today.getDay() + 6) % 7))
//     );
//     const weekEnd = new Date(weekStart);
//     weekEnd.setDate(weekStart.getDate() + 6);

//     const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
//     const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

//     const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
//     const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

//     const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
//     const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);

//     return {
//       "This Week": { startDate: weekStart, endDate: weekEnd },
//       "This Month": { startDate: monthStart, endDate: monthEnd },
//       "Last Month": { startDate: lastMonthStart, endDate: lastMonthEnd },
//       "Last Year": { startDate: lastYearStart, endDate: lastYearEnd },
//     };
//   };

//   const presetRanges = calculateRanges();

//   // Handler for preset selection
//   const handlePresetSelect = (range) => {
//     setSelectedRange(range);
//   };

//   // Handler for custom range selection
//   const handleCustomRangeChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedRange((prev) => ({ ...prev, [name]: new Date(value) }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold text-center mb-4">Date Range Picker</h2>

//       {/* Preset Options */}
//       <div className="mb-6">
//         <h3 className="text-xl font-medium mb-2">Presets</h3>
//         <div className="flex flex-wrap gap-4">
//           {Object.entries(presetRanges).map(([label, range]) => (
//             <button
//               key={label}
//               className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//               onClick={() => handlePresetSelect(range)}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Custom Range Selection */}
//       <div className="mb-6">
//         <h3 className="text-xl font-medium mb-2">Custom Range</h3>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Start Date:</label>
//             <input
//               type="date"
//               name="startDate"
//               value={
//                 selectedRange.startDate
//                   ? selectedRange.startDate.toISOString().split("T")[0]
//                   : ""
//               }
//               onChange={handleCustomRangeChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">End Date:</label>
//             <input
//               type="date"
//               name="endDate"
//               value={
//                 selectedRange.endDate
//                   ? selectedRange.endDate.toISOString().split("T")[0]
//                   : ""
//               }
//               onChange={handleCustomRangeChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Display Selected Range */}
//       <div className="mt-6">
//         <h3 className="text-xl font-medium mb-2">Selected Range</h3>
//         <p className="text-gray-700">
//           Start Date:{" "}
//           {selectedRange.startDate
//             ? selectedRange.startDate.toDateString()
//             : "Not Selected"}
//         </p>
//         <p className="text-gray-700">
//           End Date:{" "}
//           {selectedRange.endDate
//             ? selectedRange.endDate.toDateString()
//             : "Not Selected"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DatePicker;


// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const RangeDatePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   return (
//     <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-md shadow-md max-w-4xl mx-auto">
//       {/* Sidebar Options */}
//       <div className="flex flex-col w-full md:w-1/3 bg-white rounded-lg p-4 shadow-sm">
//         {["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"].map((label) => (
//           <button
//             key={label}
//             className="py-2 px-4 mb-2 text-gray-700 hover:bg-blue-100 rounded-md text-left transition-all"
//           >
//             {label}
//           </button>
//         ))}
//         <div className="mt-4">
//           <div className="mb-2 text-gray-500 font-medium">Custom Range:</div>
//           <div className="flex flex-col gap-2">
//             <input
//               type="number"
//               placeholder="Days up to today"
//               className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//             <input
//               type="number"
//               placeholder="Days starting today"
//               className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Date Picker */}
//       <div className="flex-1 flex flex-col items-center bg-white rounded-lg p-4 shadow-sm">
//         <div className="flex justify-center items-center gap-4 mb-4">
//           {/* Start Date Picker */}
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//           />
//           {/* End Date Picker */}
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="text-sm text-gray-600">
//           Selected Range:{" "}
//           <strong>
//             {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
//           </strong>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RangeDatePicker;


import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addYears } from "date-fns";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme file
import { enUS } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";

const DatePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addYears(new Date(), 1),
      key: "selection",
    },
  ]);

  return (
    <DateRangePicker
      editableDateInputs={true}
      onChange={(item) => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={enUS}
      //   className="-ml-[60px] sm:w-96 lg:w-[600px]"
      classNames={{
        dateRangeWrapper:
          "-ml-[80px] -sm:ml-[0px] -lg:ml-[0px] w-[152px] sm:w-[22rem] lg:w-[350px]", // Custom width class
        calendarWrapper: "w-[100px]", // Full width for the calendar itself
        dateDisplayItem:
          "w-[30px] px-0 sm:px-2 py-1 text-[8px] sm:text-sm bg-white rounded-md border border-gray-300", // Month, year, and date input styles
        month: "!w-40 !sm:w-48 !important", // Month picker width adjusted
        // dateDisplayWrapper:"flex items-center justify-between gap-2 p-2 w-full bg-gray-100 rounded-md", // Custom styles for the date display wrapper
        // monthAndYearWrapper: "w-[150px]", // Ensure full width for the dropdowns
        monthAndYearPickers: "!w-[100px] sm:w-fit !p-[10px]",
        // monthAndYearWrapper: " !w-[80px] !sm:w-full",
        // monthPickers: "!w-[10px] sm:w-fit",
        weekDays:
          "grid grid-cols-7 text-center w-[140px] sm:w-full text-[8px] sm:text-sm font-medium", // Adjusts the layout of week header
        days: "grid grid-cols-7 w-[140px] sm:w-full  text-[8px] sm:text-sm font-medium", // Ensures proper grid layout for calendar days
        staticRanges: " w-[10px]", // Ensures static ranges take full width
        staticRange: "p-2 text-sm cursor-pointer hover:bg-blue-100 rounded",
        definedRangesWrapper: "w-full sm:w-[10px] p-4", // Adjust container width
      }}
    />
  );
};

export default DatePicker;

// import React, { useState } from "react";
// import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";

// const DatePicker = () => {
//   const [open, setOpen] = useState(false);
//   const [dateRange, setDateRange] = useState<DateRange>({});

//   return (
//     <div className="flex flex-col items-center p-4">
//       <button
//         onClick={() => setOpen(!open)}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
//       >
//         {open ? "Close Date Picker" : "Open Date Picker"}
//       </button>

//       <DateRangePicker
//         open={open}
//         onChange={(range) => setDateRange(range)}
//       />

//       {dateRange.startDate && dateRange.endDate && (
//         <div className="mt-4 text-gray-700">
//           Selected Range:{" "}
//           <strong>
//             {dateRange.startDate.toLocaleDateString()} -{" "}
//             {dateRange.endDate.toLocaleDateString()}
//           </strong>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatePicker;

// import React, { useState } from "react";
// import { DateRange } from "react-date-range";
// import { addYears } from "date-fns";
// import "react-date-range/dist/styles.css"; // Main style file
// import "react-date-range/dist/theme/default.css"; // Theme file
// import { enUS } from "date-fns/locale";
// import { DateRangePicker } from "react-date-range";

// const DatePicker = () => {
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addYears(new Date(), 1),
//       key: "selection",
//     },
//   ]);

//   return (
//     <DateRangePicker
//       editableDateInputs={true}
//       onChange={(item) => setState([item.selection])}
//       moveRangeOnFirstSelection={false}
//       ranges={state}
//       locale={enUS}
//       //   className="-ml-[60px] sm:w-96 lg:w-[600px]"
//       classNames={{
//         dateRangeWrapper:
//           "-ml-[80px] -sm:ml-[0px] -lg:ml-[0px] w-[152px] sm:w-[22rem] lg:w-[350px]", // Custom width class
//         calendarWrapper: "w-[100px]", // Full width for the calendar itself
//         dateDisplayItem:
//           "w-[30px] px-0 sm:px-2 py-1 text-[8px] sm:text-sm bg-white rounded-md border border-gray-300", // Month, year, and date input styles
//         month: "!w-40 !sm:w-48 !important", // Month picker width adjusted
//         // dateDisplayWrapper:"flex items-center justify-between gap-2 p-2 w-full bg-gray-100 rounded-md", // Custom styles for the date display wrapper
//         // monthAndYearWrapper: "w-[150px]", // Ensure full width for the dropdowns
//         monthAndYearPickers: "w-[100px] sm:w-fit",
//         monthAndYearWrapper: "flex sm:justify-between justify-center !w-[80px] !sm:w-full gap-1",
//         // monthPickers: "w-[10px] sm:w-fit",
//         weekDays:
//           "grid grid-cols-7 text-center w-[140px] sm:w-full text-[8px] sm:text-sm font-medium", // Adjusts the layout of week header
//         days: "grid grid-cols-7 w-[140px] sm:w-full  text-[8px] sm:text-sm font-medium", // Ensures proper grid layout for calendar days
//         staticRanges: " w-[10px]", // Ensures static ranges take full width
//         staticRange: "p-2 text-sm cursor-pointer hover:bg-blue-100 rounded",
//         definedRangesWrapper: "w-full sm:w-[10px] p-4", // Adjust container width
//       }}
//     />
//   );
// };

// export default DatePicker;
// import React from "react";
// import { addDays } from "date-fns";
// import { useState } from "react";
// import { DateRangePicker } from "react-date-range";

// const DatePicker = () => {
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);
//   return (
//     <DateRangePicker
//       onChange={(item) => setState([item.selection])}
//       showSelectionPreview={true}
//       moveRangeOnFirstSelection={false}
//       months={2}
//       ranges={state}
//       direction="horizontal"
//     />
//   );
// };

// export default DatePicker;
