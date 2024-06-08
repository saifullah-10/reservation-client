import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Reservation() {
  const [selectedVehicleType, setselectedVehicleType] = useState("");
  const [selectedVehicleName, setselectedVehicleName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [endDateTime, setEndDateTime] = useState("");
  const [rentalTax, setRentalTax] = useState("");
  const pickUpDate = new Date(startDateTime);
  const returnDate = new Date(endDateTime);
  const durationInSecond = (returnDate - pickUpDate) / 1000;
  const durationInMinute = durationInSecond / 60;
  const durationInHour = Math.floor(durationInMinute / 60);

  // get data from api using tanstack query
  const { data, isLoading } = useQuery({
    queryKey: ["vehicleData"],
    queryFn: async () => {
      return await axios.get(
        "https://exam-server-7c41747804bf.herokuapp.com/carsList"
      );
    },
  });
  //   time conversion
  function convertHoursToWeekDayHour(totalHours) {
    const weeks = Math.floor(totalHours / (24 * 7));
    const remainingHours = totalHours % (24 * 7);
    const days = Math.floor(remainingHours / 24);
    const remainingFinalHours = remainingHours % 24;

    return { weeks, days, remainingFinalHours };
  }
  const { weeks, days, remainingFinalHours } =
    convertHoursToWeekDayHour(durationInHour);

  const vehicleData = data?.data?.data;
  //   remove multiple type
  const uniqueVehicleTypes = [...new Set(vehicleData?.map((car) => car.type))];

  //   for select vehicle type
  const handleselectedVehicleType = (e) => {
    setselectedVehicleType(e.target.value);
  };
  //   select vehicle using vehicle type
  const filteredVehicle = vehicleData?.filter(
    (vehicle) => vehicle.type === selectedVehicleType
  );
  //   for rental rate
  const handleRentalTax = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setRentalTax(value);
    } else {
      setRentalTax("");
    }
  };
  const taxPercentage = rentalTax?.split(",")[1] || 0;
  const taxRate = parseFloat(taxPercentage);
  // for discount calculation
  const validateDiscount = discount ? discount : 0;
  // for additional charges
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    setSelectedOptions((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((option) => option !== value);
      }
    });
  };
  const totalOptionsRate = selectedOptions?.reduce((total, option) => {
    const optionRate = option.split(",")[1];
    const convertToNumber = parseInt(optionRate);
    return total + convertToNumber;
  }, 0);
  //   Detect vehicle for rates, based on vehicle information
  const singleVehicaleForRate = vehicleData?.filter(
    (vehicle) =>
      vehicle.type === selectedVehicleType &&
      vehicle.make === selectedVehicleName
  );
  // Calculate rates from array
  const getRatesFromArray = singleVehicaleForRate?.[0]?.rates;
  const hourlyRate = getRatesFromArray?.hourly;
  const dailyRate = getRatesFromArray?.daily;
  const weeklyRate = getRatesFromArray?.weekly;
  const totalHourlyRate = remainingFinalHours * hourlyRate || 0;
  const totalDailyRate = days * dailyRate || 0;
  const totalWeeklyRate = weeks * weeklyRate || 0;
  const totalRate = totalHourlyRate + totalDailyRate + totalWeeklyRate;
  const calculateTaxAmount = (totalRate * taxRate) / 100;
  const calculateDiscountAmount =
    ((totalRate + calculateTaxAmount + totalOptionsRate) * validateDiscount) /
    100;
  const finalRate =
    totalRate + calculateTaxAmount + totalOptionsRate - calculateDiscountAmount;
  const handleVehicleName = (e) => {
    setselectedVehicleName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const getData = e.target;
    const reservationID = getData.reservation_id.value;
    const firstName = getData.first_name.value;
    const lastName = getData.last_name.value;
    const email = getData.email.value;
    const phone = getData.phone.value;

    const data = {
      reservation_id: reservationID,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      summaryData: [
        ["", "UNIT", "PRICE", "AMOUNT"],
        [
          "Hourly",
          `${remainingFinalHours || 0}`,
          `$ ${hourlyRate || 0}`,
          `$ ${totalHourlyRate}`,
        ],
        ["Daily", `${days || 0}`, `$ ${dailyRate || 0}`, `$ ${totalDailyRate}`],
        [
          "Weekly",
          `${weeks || 0}`,
          `$ ${weeklyRate || 0}`,
          `$ ${totalWeeklyRate}`,
        ],
        [
          "NYS State Tax",
          "",
          `${taxPercentage}%`,
          `$ ${calculateTaxAmount?.toFixed(2)}`,
        ],
        [
          "EST TOTAL TIME & MILAGE",
          "",
          "",
          `$ ${(totalRate + calculateTaxAmount).toFixed(2)}`,
        ],
        ["Discount", "", "", `-$ ${calculateDiscountAmount?.toFixed(2)}`],
        ["Damages", "", "", `$ ${totalOptionsRate}`],
        ["Traffic tickets", "", "", "$0.00"],
        ["TOTAL ESTIMATED CHARGES", "", "", `$ ${finalRate?.toFixed(2)}`],
        ["Renter Payments", "", "", `$ ${finalRate?.toFixed(2)}`],
      ],
      vehicle_type: selectedVehicleType,
      vehicle_name: selectedVehicleName,
      start_date_time: startDateTime,
      end_date_time: endDateTime,
      rental_tax: rentalTax,
      discount: discount,
      options: selectedOptions,
      total_rate: finalRate,
    };
    console.log(data);

    axios
      .post("https://server-gold-one.vercel.app/invoice", data, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Reservation_invoice.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error generating PDF:", error));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <section className=" bg-slate-100">
        <form onSubmit={handleFormSubmit} className=" w-[90%] mx-auto py-10 ">
          <div className="flex justify-between items-center my-5">
            <h1 className="lg:text-4xl text-2xl md:text-3xl font-bold">
              Reservation
            </h1>
            <button className="px-4 lg:py-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Print / Download
            </button>
          </div>
          <div className=" grid grid-cols-12 gap-5">
            <div className="  col-span-12 lg:col-span-8 grid grid-cols-12 gap-5">
              <div className=" col-span-12 md:col-span-6 lg:col-span-6 flex flex-col gap-6">
                <div className=" w-full">
                  <div className="text-left">
                    <h1 className=" text-xl lg:text-2xl font-bold">
                      Reservation Details
                    </h1>
                    <hr className="border-indigo-500 border-2 mt-2 mb-4" />
                  </div>
                  <div className="bg-white p-4 border-gray-300 border-2 rounded-lg shadow-md">
                    <div className=" mb-4">
                      <label
                        htmlFor="reservation_id"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Reservation ID
                      </label>
                      <input
                        type="text"
                        id="reservation_id"
                        name="reservation_id"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your reservation ID"
                      />
                    </div>
                    <div className=" mb-4">
                      <label
                        htmlFor="pickup_date"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Pickup Date <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        id="pickup_date"
                        required
                        value={startDateTime}
                        onChange={(e) => setStartDateTime(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className=" mb-4">
                      <label
                        htmlFor="return_date"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Return Date <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        value={endDateTime}
                        onChange={(e) => setEndDateTime(e.target.value)}
                        id="return_date"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className=" flex items-center gap-16 mb-4">
                      <label
                        htmlFor="duration"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        readOnly
                        disabled
                        value={`${weeks || 0} Week ${days || 0} Day ${
                          remainingFinalHours || 0
                        } Hour`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
                      />
                    </div>
                    <div className=" mb-4">
                      <label
                        htmlFor="discount"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Discount %
                      </label>
                      <input
                        type="number"
                        id="discount"
                        onChange={(e) => setDiscount(e.target.value)}
                        name="discount"
                        value={discount}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className=" w-full">
                  <div className="text-left">
                    <h1 className="text-xl lg:text-2xl font-bold">
                      Vehicle Information
                    </h1>
                    <hr className="border-indigo-500 border-2 mt-2 mb-4" />
                  </div>
                  <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md">
                    <div className="mb-6">
                      <label
                        htmlFor="vehicle_type"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Vehicle Type <span className=" text-red-600">*</span>
                      </label>
                      <select
                        onChange={handleselectedVehicleType}
                        name="vehicle_type"
                        id="vehicle_type"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option disabled selected>
                          Select Type
                        </option>
                        {uniqueVehicleTypes?.map((car, index) => (
                          <option key={index} value={car}>
                            {car}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="vehicle"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Vehicle <span className=" text-red-600">*</span>
                      </label>
                      <select
                        onChange={handleVehicleName}
                        name="vehicle"
                        id="vehicle"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option disabled selected>
                          First Select Vehicle Type
                        </option>
                        {filteredVehicle?.map((car, index) => (
                          <option key={index} value={car.make}>
                            {car.make}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-12 md:col-span-6 lg:col-span-6 flex flex-col gap-6">
                <div className="w-full">
                  <div className="text-left">
                    <h1 className="text-xl lg:text-2xl font-bold">
                      Customer Information
                    </h1>
                    <hr className="border-indigo-500 border-2 mt-2 mb-4" />
                  </div>
                  <div className="bg-white border-gray-300 border-2 p-4 rounded-lg shadow-md ">
                    <div className="mb-6">
                      <label
                        htmlFor="first_name"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        First Name <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="last_name"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Last Name <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        required
                        name="last_name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Email <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        name="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Phone <span className=" text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>
                <div className=" w-full">
                  <div className="text-left">
                    <h1 className="text-xl lg:text-2xl font-bold">
                      Additional Charges
                    </h1>
                    <hr className="border-indigo-500 border-2 mt-2 mb-4" />
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-300 shadow-md">
                    <div className="mb-6 flex justify-between">
                      <label
                        htmlFor="Damage_Waiver"
                        className="flex items-center"
                      >
                        <input
                          type="checkbox"
                          id="Damage_Waiver"
                          name="Damage_Waiver"
                          value="Collision Damage Waiver, 9"
                          className="mr-2"
                          onChange={handleCheckboxChange}
                        />
                        Collision Damage Waiver
                      </label>
                      <p>$9.00</p>
                    </div>

                    <div className="mb-6 flex justify-between">
                      <label htmlFor="Insurance" className="flex items-center">
                        <input
                          type="checkbox"
                          id="Insurance"
                          name="Insurance"
                          value="Liability Insurance, 15"
                          className="mr-2"
                          onChange={handleCheckboxChange}
                        />
                        Liability Insurance
                      </label>
                      <p>$15.00</p>
                    </div>

                    <div className="flex justify-between">
                      <label htmlFor="checkbox3" className="flex items-center">
                        <input
                          type="checkbox"
                          id="Rental_Tax"
                          name="Rental_Tax"
                          value=" Rental Tax, 11.5"
                          className="mr-2"
                          onChange={handleRentalTax}
                        />
                        Rental Tax
                      </label>
                      <p>11.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="text-left">
                <h1 className=" text-xl lg:text-2xl font-bold">
                  Charges Summery
                </h1>
                <hr className="border-indigo-500 border-2 mt-2 mb-4" />
              </div>
              <div className="bg-[#dfdfff] w-full border-2 border-blue-500 p-5  overflow-x-auto   shadow-md rounded-xl">
                <table className=" w-full">
                  <thead>
                    <tr className=" border-b-2 border-blue-500">
                      <th className="py-2 px-4 ">Charge</th>
                      <th className="py-2 px-4 ">Unit</th>
                      <th className="py-2 px-4 ">Rate</th>
                      <th className="py-2 px-4 ">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 ">Hourly</td>
                      <td className="py-2 px-4 text-center">
                        {remainingFinalHours || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        ${hourlyRate?.toFixed(2) || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        ${totalHourlyRate?.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 ">Daily</td>
                      <td className="py-2 px-4 text-center">{days || 0}</td>
                      <td className="py-2 px-4 text-center">
                        ${dailyRate?.toFixed(2) || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        ${totalDailyRate.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 ">Weekly</td>
                      <td className="py-2 px-4 text-center">{weeks || 0}</td>
                      <td className="py-2 px-4 text-center">
                        ${weeklyRate?.toFixed(2) || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        ${totalWeeklyRate?.toFixed(2)}
                      </td>
                    </tr>

                    {selectedOptions?.map((option, index) => {
                      const [name, rate] = option.split(",");
                      return (
                        <tr key={index}>
                          <td colSpan="2" className="py-2 px-4 ">
                            {name}
                          </td>
                          <td className="py-2 px-4 text-center">
                            ${parseInt(rate).toFixed(2)}
                          </td>
                          <td className="py-2 px-4 text-center">
                            ${parseInt(rate).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    {calculateTaxAmount ? (
                      <tr>
                        <td colSpan="2" className="py-2 px-4">
                          Rental Tax
                        </td>

                        <td className="py-2 px-4 text-center">11.5%</td>
                        <td className="py-2 px-4 text-center">
                          ${calculateTaxAmount?.toFixed(2)}
                        </td>
                      </tr>
                    ) : null}
                    {discount ? (
                      <tr>
                        <td colSpan="2" className="py-2 px-4">
                          Discount
                        </td>

                        <td className="py-2 px-4 text-center">{discount}%</td>
                        <td className="py-2 px-4 text-center">
                          - ${calculateDiscountAmount?.toFixed(2)}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td
                        colSpan="2"
                        className="py-2 font-bold px-4 text-center"
                      >
                        Total
                      </td>
                      <td
                        colSpan="2"
                        className="py-2 px-4 font-bold text-center"
                      >
                        ${finalRate?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
