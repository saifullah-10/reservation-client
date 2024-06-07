import { useState } from "react";

function App() {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);
  const rentalDuration = (end - start) / 1000 / 60;
  console.log(rentalDuration);
  return (
    <>
      <div>
        <label>
          Start Date and Time:
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date and Time:
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </label>
      </div>
    </>
  );
}

export default App;
