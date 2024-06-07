export default function Reservation() {
  return (
    <>
      <section className=" bg-slate-100">
        <div className=" w-[90%] mx-auto py-10 ">
          <div className="flex justify-between items-center my-5">
            <h1 className="text-4xl font-bold">Reservation</h1>
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Print / Download
            </button>
          </div>
          <div className=" grid grid-cols-12 gap-5">
            <form className=" col-span-8 grid grid-cols-12 gap-5">
              <div className=" col-span-6 flex flex-col gap-6">
                <div className=" w-full">
                  <div className="text-left">
                    <h1 className="text-2xl font-bold">Reservation Details</h1>
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
                        name="pickup_date"
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
                        name=""
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
                        value="duration"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className=" mb-4">
                      <label
                        htmlFor="discount"
                        className="block text-lg font-medium text-gray-700 mb-2"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        id="discount"
                        name="discount"
                        value="discount"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                <div className=" w-full">
                  <div className="text-left">
                    <h1 className="text-2xl font-bold">Vehicle Information</h1>
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
                        name="vehicle_type"
                        id="vehicle_type"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="honda">Honda</option>
                        <option value="toyota">Toyota</option>
                        <option value="ford">Ford</option>
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
                        name="vehicle"
                        id="vehicle"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="accord">Accord</option>
                        <option value="civic">Civic</option>
                        <option value="crv">CR-V</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-6 flex flex-col gap-6">
                <div className="w-full">
                  <div className="text-left">
                    <h1 className="text-2xl font-bold">Customer Information</h1>
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
                        type="tel"
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
                    <h1 className="text-2xl font-bold">Additional Charges</h1>
                    <hr className="border-indigo-500 border-2 mt-2 mb-4" />
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-300 shadow-md">
                    <div className="mb-6 flex justify-between">
                      <label htmlFor="checkbox1" className="flex items-center">
                        <input
                          type="checkbox"
                          id="checkbox1"
                          name="checkbox1"
                          value="option1"
                          className="mr-2"
                        />
                        Collision Damage Waiver
                      </label>
                      <p>$9.00</p>
                    </div>

                    <div className="mb-6 flex justify-between">
                      <label htmlFor="checkbox2" className="flex items-center">
                        <input
                          type="checkbox"
                          id="checkbox2"
                          name="checkbox2"
                          value="option2"
                          className="mr-2"
                        />
                        Liability Insurance
                      </label>
                      <p>$15.00</p>
                    </div>

                    <div className="flex justify-between">
                      <label htmlFor="checkbox3" className="flex items-center">
                        <input
                          type="checkbox"
                          id="checkbox3"
                          name="checkbox3"
                          value="option3"
                          className="mr-2"
                        />
                        Rental Tax
                      </label>
                      <p>11.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className=" col-span-4">
              <div className="text-left">
                <h1 className="text-2xl font-bold">Charges Summery</h1>
                <hr className="border-indigo-500 border-2 mt-2 mb-4" />
              </div>
              <div className="bg-[#dfdfff] w-full border-2 border-blue-500 p-5   shadow-md rounded-xl">
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
                      <td className="py-2 px-4">Service A</td>
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">$50</td>
                      <td className="py-2 px-4">$500</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-2 px-4">
                        Total
                      </td>
                      <td colSpan="2" className="py-2 px-4 text-right">
                        $10.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
