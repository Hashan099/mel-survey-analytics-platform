'use client';
import Navbar from "./Components/shared/navbar/Navbar";
import Protected from "../Contexts/Protected";
import ComingSoon from "./Components/Utils/ComingSoon";

export default function Home() {
  return (
    <Protected>
      <Navbar />
      <div className="pt-20 bg-gray-950 min-h-screen">
        <ComingSoon />
      </div>
    </Protected>
  );
}
