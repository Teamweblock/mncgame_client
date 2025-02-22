import React, { useState } from "react";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, format, addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme file
import { DateRangePicker } from "react-date-range";

const DatePicker = ({ startDate, endDate, onDateChange }) => {
  const currentDate = new Date();

  const [state, setState] = useState([
    {
      // startDate: addDays(new Date(), 1),  // Default start date is today
      startDate: new Date(),  // Default start date is today
      endDate: endDate,    // Default end date is today
      key: "selection",
    },
  ]);

  // Calculate predefined ranges
  const predefinedRanges = [
    {
      label: "Today",
      range: () => ({
        startDate: currentDate,
        endDate: currentDate,
      }),
    },
    {
      label: "Yesterday",
      range: () => {
        const yesterday = subDays(currentDate, 1);
        return {
          startDate: yesterday,
          endDate: yesterday,
        };
      },
    },
    {
      label: "This Week",
      range: () => ({
        startDate: startOfWeek(currentDate, { weekStartsOn: 1 }), // Week starts on Monday
        endDate: currentDate,
      }),
    },
    {
      label: "Last Week",
      range: () => {
        const lastWeekStart = startOfWeek(subDays(currentDate, 7), { weekStartsOn: 1 });
        const lastWeekEnd = endOfWeek(subDays(currentDate, 7), { weekStartsOn: 1 });
        return {
          startDate: lastWeekStart,
          endDate: lastWeekEnd,
        };
      },
    },
    {
      label: "This Month",
      range: () => ({
        startDate: startOfMonth(currentDate),
        endDate: currentDate,
      }),
    },
    {
      label: "Last Month",
      range: () => {
        const lastMonthStart = startOfMonth(subDays(currentDate, 30));
        const lastMonthEnd = endOfMonth(subDays(currentDate, 30));
        return {
          startDate: lastMonthStart,
          endDate: lastMonthEnd,
        };
      },
    },
    {
      label: "Recent Date",
      range: () => ({
        startDate: currentDate,
        endDate: currentDate,
      }),
    },
  ];
  // Handle date selection
  const handleDateChange = (item) => {
    setState([item.selection]);
    onDateChange(item.selection); // Notify parent component of the change
  };

  return (
    <DateRangePicker
      editableDateInputs={true}
      showSelectionPreview={true}
      // onChange={(item) => setState([item.selection])}
      onChange={handleDateChange}
      moveRangeOnFirstSelection={false}
      ranges={state}
      locale={enUS}
      staticRanges={predefinedRanges.map((range) => ({
        label: range.label,
        range: range.range,
        isSelected: () => {
          const { startDate, endDate } = state[0] || {};
          // Handle null dates in isSelected function
          if (!startDate || !endDate) return false;
          return (
            format(startDate, "yyyy-MM-dd") === format(range.range().startDate, "yyyy-MM-dd") &&
            format(endDate, "yyyy-MM-dd") === format(range.range().endDate, "yyyy-MM-dd")
          );
        },
      }))}
      inputRanges={[]}
      maxDate={currentDate} // Disable today and any future dates
      classNames={{
        dateRangeWrapper:
          "-ml-[80px] -sm:ml-[0px] -lg:ml-[0px] w-[152px] sm:w-[22rem] lg:w-[350px]", // Custom width class
        calendarWrapper: "w-[100px]", // Full width for the calendar itself
        dateDisplayItem:
          "w-[30px] px-0 sm:px-2 py-1 text-[8px] sm:text-sm bg-white rounded-md border border-gray-300", // Month, year, and date input styles
        month: "!w-40 sm:!w-full", // Month picker width adjusted
        monthAndYearPickers: "!w-[100px] sm:w-fit !p-[10px]",
        weekDays:
          "grid grid-cols-7 text-center w-[140px] sm:w-full text-[8px] sm:text-sm font-medium", // Adjusts the layout of week header
        days: "grid grid-cols-7 w-[140px] sm:w-full  text-[8px] sm:text-sm font-medium", // Ensures proper grid layout for calendar days
        staticRanges: " w-[10px]", // Ensures static ranges take full width
        staticRange: "p-2 text-sm cursor-pointer hover:bg-blue-100 rounded",
        definedRangesWrapper: "!w-[400px] sm:w-[10px] p-4", // Adjust container width
      }}
    />
  );
};

export default DatePicker;
