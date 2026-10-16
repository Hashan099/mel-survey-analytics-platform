"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../Components/shared/navbar/Navbar";
import SuccessModal from "../../Components/Utils/SuccessModal";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("MEL User");
  const [password, setPassword] = useState("meL123@Nld");
  const [confirmPassword, setConfirmPassword] = useState("meL123@Nld");
  const [provinceData, setProvinceData] = useState({});
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [institute, setInstitute] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [divisionalSecretariats, setDivisionalSecretariats] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("/api/provinces")
      .then((response) => {
        setProvinceData(response.data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Get districts based on selected province
  const districts = province ? Object.keys(provinceData[province]) : [];

  // Update divisional secretariats when the district changes
  useEffect(() => {
    if (district && province) {
      setDivisionalSecretariats(provinceData[province][district]);
      setInstitute(""); // Reset DS when district changes
    }
  }, [district, province, provinceData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const response = await axios.post("/api/auth/register", {
          email,
          password,
          confirmPassword,
          name,
          province,
          district,
          institute,
        });
        if (response.status === 200) setSuccess(true);
      } catch (error) {
        setErrorMessage(error.response.data);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  if (success)
    return <SuccessModal modalTitle="User account created successfully!" />;

  return (
    <>
    {/*   <Navbar /> */}
      <main className="w-full h-screen mt-10 flex self-center place-content-center place-items-center">
        <div className="w-150 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6"></div>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 font-bold">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-bold">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  disabled
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-bold">
                  Password
                </label>
                <input
                  /*   disabled={isRegistering} */
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                />
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-1"
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-sm text-gray-600"
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 font-bold">
                  Confirm Password
                </label>
                <input
                  /*   disabled={isRegistering} */
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  readOnly
                  disabled
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 font-bold">
                  Province
                </label>
                <select
                  required
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                    setDistrict(""); // Reset district when province changes
                    setInstitute(""); // Reset DS when province changes
                  }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                >
                  <option value="" disabled>
                    Select a Province
                  </option>
                  {Object.keys(provinceData).map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-bold">
                  District
                </label>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                >
                  <option value="" disabled>
                    Select a District
                  </option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              <div className="text-center">
                <label className="text-sm text-gray-600 font-bold block">
                  Institute
                </label>
                <select
                  required
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                >
                  <option value="" disabled>
                    Select an Institute
                  </option>
                  {divisionalSecretariats.map((secretariat) => (
                    <option key={secretariat} value={secretariat}>
                      {secretariat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center flex-col items-center mt-4">
              {" "}
              {errorMessage && (
                <span className="col-span-2 text-red-600 text-center mb-4 font-bold">
                  {errorMessage}
                </span>
              )}
              <button
                type="submit"
                disabled={isRegistering}
                className={`w-48 px-4 py-2 text-white text-center font-medium rounded-lg ${
                  isRegistering
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-secondary hover:shadow-xl transition duration-300"
                }`}
              >
                {" "}
                {isRegistering
                  ? "Creating an account..."
                  : "Create account"}{" "}
              </button>{" "}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
