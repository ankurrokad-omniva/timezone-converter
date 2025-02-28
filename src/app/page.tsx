"use client";
import { DateTime } from "luxon";
import { useState } from "react";

const timezones = [
  "America/New_York",
  "Europe/London",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

export default function TimezoneConverter() {
  const [selectedDateTime, setSelectedDateTime] = useState(DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"));
  const [inputTimezone, setInputTimezone] = useState("UTC");
  const [selectedTimezones, setSelectedTimezones] = useState(["America/New_York", "Europe/London"]);

  const handleDateTimeChange = (e:any) => {
    setSelectedDateTime(e.target.value);
  };

  const handleInputTimezoneChange = (e:any) => {
    setInputTimezone(e.target.value);
  };

  const handleTimezoneSelection = (e:any) => {
    const options = Array.from(e.target.selectedOptions, (option:any) => option.value);
    setSelectedTimezones(options);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Timezone Converter</h1>
      <div className="flex flex-col w-full gap-4 mb-4">
        <label className="font-semibold">Select Date & Time:</label>
        <input
          type="datetime-local"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="flex flex-col w-full gap-4 mb-4">
        <label className="font-semibold">Select Input Timezone:</label>
        <select onChange={handleInputTimezoneChange} value={inputTimezone} className="p-2 border rounded w-full">
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full gap-4 mb-4">
        <label className="font-semibold">Select Timezones to Compare:</label>
        <select multiple onChange={handleTimezoneSelection} className="p-2 border rounded w-full h-32">
          {timezones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <h2 className="text-lg font-bold mb-2">Converted Times:</h2>
        <div className="space-y-2">
          {selectedTimezones.map((tz) => {
            const localTime = DateTime.fromISO(selectedDateTime, { zone: inputTimezone }).setZone(tz);
            return (
              <div key={tz} className="p-2 border rounded bg-gray-100">
                <strong>{tz}:</strong> {localTime.toFormat("yyyy-MM-dd hh:mm a")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
