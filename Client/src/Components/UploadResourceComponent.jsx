import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  universities,
  faculties,
  departments,
} from "../store/UniversitySection";
import FullFileUpload from "./FullFileUpload";
import { createResource } from "../API/ResouceAPI";
import { useAuth } from "../Hooks/useAuth";
import { getCurrentUser } from "../API/UserAPI";

const UploadResourceComponent = ({ setOpen, setFlag, flag }) => {
  const [faculty, setFaculty] = useState(faculties[0]);
  const [department, setDepartment] = useState(departments[faculty][0]);
  const [university, setUniversity] = useState(universities[0]);
  const [cancel, setCancel] = useState(true);
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    type: "book",
    description: "",
    university: university,
    faculty: faculty,
    department: department,
    tags: [],
    access_mode: "downloadable",
    files: [],
    thumbnail: "",
    uploader: user._id,
  });
  const [validation, setValidation] = useState({
    title: "",
    type: "",
    description: "",
    university: "",
    faculty: "",
    department: "",
    files: "",
  });
  useEffect(() => {
    setOpen(cancel);
  }, [cancel]);

  // useEffect(() => {
  //   const callFunction = async () => {
  //     try {
  //       const res = await getCurrentUser();
  //       setForm((prev) => ({ ...prev, uploader: res._id }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   callFunction();
  // }, []);

  const validateForm = () => {
    if (
      !form.title ||
      !form.type ||
      !form.description ||
      !form.university ||
      !form.faculty ||
      !form.department ||
      !form.files.length < 1
    ) {
      return false;
    }
    return true;
  };
  const validateTitle = (e) => {
    if (!e || e.length < 3) {
      setValidation({
        ...validation,
        title: "Title must be at least 3 characters long",
      });
    } else {
      setValidation({ ...validation, title: "" });
    }
    setForm((prev) => ({ ...prev, title: e }));
  };
  const validateType = (e) => {
    if (!e) {
      setValidation({ ...validation, type: "Type is required" });
    } else {
      setValidation({ ...validation, type: "" });
    }
    setForm((prev) => ({ ...prev, type: e }));
  };
  const validateDescription = (e) => {
    if (!e || e.length < 10) {
      setValidation({
        ...validation,
        description: "Description must be at least 10 characters long",
      });
    } else {
      setValidation({ ...validation, description: "" });
    }
    setForm((prev) => ({ ...prev, description: e }));
  };
  const validateUniversity = (e) => {
    if (!e) {
      setValidation({ ...validation, university: "University is required" });
    } else {
      setValidation({ ...validation, university: "" });
    }
    setForm((prev) => ({ ...prev, university: e }));
    setUniversity(e);
  };
  const validateFaculty = (e) => {
    if (!e) {
      setValidation({ ...validation, faculty: "Faculty is required" });
    } else {
      setValidation({ ...validation, faculty: "" });
    }
    setForm((prev) => ({ ...prev, faculty: e }));
    setFaculty(e);
    validateDepartment(departments[e][0]);
  };
  const validateDepartment = (e) => {
    if (!e) {
      setValidation({ ...validation, department: "Department is required" });
    } else {
      setValidation({ ...validation, department: "" });
    }
    setForm((prev) => ({ ...prev, department: e }));
    setDepartment(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      form.title.length < 3 ||
      form.type.length < 3 ||
      form.description.length < 10 ||
      form.university.length < 3 ||
      form.faculty.length < 3 ||
      form.department.length < 3 ||
      form.files.length < 1
    ) {
      setValidation({
        title: "Title is required",
        type: "Type is required",
        description: "Description is required",
        university: "University is required",
        faculty: "Faculty is required",
        department: "Department is required",
        files: "Files is required",
      });
    } else {
      setValidation({
        title: "",
        type: "",
        description: "",
        files: "",
        university: "",
        faculty: "",
        department: "",
      });
      try {
        const res = await createResource(form);
        const user = await getCurrentUser();
        user.resources.push(res._id);
        console.log(user.resources);
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="w-full h-6 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 rounded-t-2xl"></div>
      <div className="bg-white rounded-b-3xl border border-gray-100 shadow-sm pl-6 text-center pt-4 ">
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
          <form
            action=""
            className="text-start mt-8 ml-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="flex text-2xl items-center gap-1 font-semibold text-start">
              <div className="bg-linear-to-b from-purple-500 via-pink-500 to-orange-400 w-[3px] h-6 rounded-xl"></div>
              Basic Information
            </h1>
            <div className="flex flex-col gap-2 w-1/4 mt-8">
              <label htmlFor="">Resource Title*</label>
              <Input
                type="text"
                onChange={(e) => validateTitle(e.target.value)}
              />
              {validation.title && (
                <p className="text-red-500">{validation.title}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-1/4 mt-4">
              <label htmlFor="">Resource Type*</label>
              <select
                name=""
                id=""
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                onChange={(e) => validateType(e.target.value)}
                defaultValue={"book"}
              >
                <option value="">Select Type</option>
                <option value="book">Book</option>
                <option value="slides">Slides</option>
                <option value="course">Course</option>
                <option value="exam">Exam</option>
              </select>
              {validation.type && (
                <p className="text-red-500">{validation.type}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-1/4 mt-4">
              <label htmlFor="">Resource Description*</label>
              <Input
                type="text"
                onChange={(e) => validateDescription(e.target.value)}
              />
              {validation.description && (
                <p className="text-red-500">{validation.description}</p>
              )}
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
                  onChange={(e) => validateUniversity(e.target.value)}
                  defaultValue={universities[0]}
                >
                  {universities.map((university, index) => (
                    <option key={index} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
                {validation.university && (
                  <p className="text-red-500">{validation.university}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-1/4 mt-4">
                <label htmlFor="">Faculty*</label>
                <select
                  name=""
                  id=""
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  onChange={(e) => validateFaculty(e.target.value)}
                  defaultValue={faculties[0]}
                >
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
                {validation.faculty && (
                  <p className="text-red-500">{validation.faculty}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-1/4 mt-4">
                <label htmlFor="">Department*</label>
                <select
                  name=""
                  id=""
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  onChange={(e) => validateDepartment(e.target.value)}
                  defaultValue={departments[faculty][0]}
                >
                  {departments[faculty]?.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
                {validation.department && (
                  <p className="text-red-500">{validation.department}</p>
                )}
              </div>
            </div>

            <div>
              <FullFileUpload
                setCancel={setCancel}
                setForm={setForm}
                form={form}
                handleSubmit={handleSubmit}
                validation={validation}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadResourceComponent;
