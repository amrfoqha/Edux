import React, { useState } from "react";
import { Input } from "./ui/input";
import { faculties, departments } from "../store/UniversitySection";
import FullFileUpload from "./FullFileUpload";

const UploadResourceComponent = () => {
  const [faculty, setFaculty] = useState("Faculty of Engineering");
  const [department, setDepartment] = useState("");

  return (
    <>
      <div className="w-full h-6 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 rounded-t-2xl"></div>
      <div className="bg-white rounded-b-3xl border border-gray-100 shadow-sm pl-6 text-center pt-4">
        <div className="flex justify-start">
          <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-3xl inline-flex mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-upload h-10 w-10 text-white"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
          </div>
          <div className="flex flex-col items-start justify-start ml-6 ">
            <h1 className="text-3xl font-normal">Upload Resource</h1>
            <p className="text-gray-500 text-md mt-2">
              Share your educational materials with the community
            </p>
          </div>
        </div>
        <div>
          <form action="" className="text-start mt-8 ml-5">
            <h1 className="flex text-2xl items-center gap-1 font-semibold text-start">
              <div className="bg-linear-to-b from-purple-500 via-pink-500 to-orange-400 w-[3px] h-6 rounded-xl"></div>
              Basic Information
            </h1>
            <div className="flex flex-col gap-2 w-1/4 mt-8">
              <label htmlFor="">Resource Title*</label>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-2 w-1/4 mt-4">
              <label htmlFor="">Resource Type*</label>
              <Input type="text" />
            </div>
            <div className="flex flex-col gap-2 w-1/4 mt-4">
              <label htmlFor="">Resource Description*</label>
              <Input type="text" />
            </div>
            <h1 className="flex text-2xl items-center gap-1 font-semibold text-start mt-8">
              <div className="bg-linear-to-b from-purple-500 via-pink-500 to-orange-400 w-[3px] h-6 rounded-xl"></div>
              Academic Details
            </h1>
            <div className="flex justify-evenly">
              <div className="flex flex-col gap-2 w-1/4 mt-4">
                <label htmlFor="">University*</label>
                <select
                  name=""
                  id=""
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                >
                  <option value="An-Najah">An-Najah National University</option>
                  <option value="Birzeit">Birzeit University </option>
                  <option value="Al-Quds">
                    Al-Quds University(Jerusalem University)
                  </option>
                  <option value="Al-Quds-Open">Al-Quds Open University</option>
                  <option value="Arab-American">
                    Arab American University
                  </option>
                  <option value="Bethlehem">Bethlehem University</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-1/4 mt-4">
                <label htmlFor="">Faculty*</label>
                <select
                  name=""
                  id=""
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 w-1/4 mt-4">
                <label htmlFor="">Department*</label>
                <select
                  name=""
                  id=""
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments[faculty]?.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <FullFileUpload />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadResourceComponent;
