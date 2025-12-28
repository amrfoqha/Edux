import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Filter, Search } from "lucide-react";
import FilterSelect from "../Components/shared/FilterSelect";
import SearchInput from "../Components/shared/SearchInput";
import SearchBar from "../Components/shared/SearchBar";
import { getResourcesByPage } from "../API/ResouceAPI";
import {
  universities,
  faculties,
  departments,
} from "../store/UniversitySection";
import { ResourceCard } from "../components/shared/ResourceCard";
import UsePagination from "../Hooks/usePagination";

const BrowesResourcePage = () => {
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState(universities[0]);
  const [faculty, setFaculty] = useState(faculties[0]);
  const [department, setDepartment] = useState(departments[faculty][0]);
  const [type, setType] = useState("book");
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allResources, setAllResources] = useState([]);

  useEffect(() => {
    setDepartment(departments[faculty][0]);
    submitSearch();
  }, [faculty, page]);

  const submitSearch = () => {
    setTimeout(async () => {
      try {
        const resources = await getResourcesByPage(page, limit, {
          q: search,
          university,
          faculty,
          department,
          type,
        });
        setAllResources(resources.data);
        setTotalItems(resources.totalItems);
        setTotalPages(resources.totalPages);
        console.log(resources);
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-linear-to-br from-primary to-secondary p-3 rounded-2xl shadow-lg">
            <Search className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Browse Resources</h1>
            <p className="text-muted-foreground text-lg">
              Explore <span className="text-primary font-semibold">0</span>{" "}
              resources shared by students worldwide
            </p>
          </div>
        </div>
      </motion.div>

      <form action="#" onChange={submitSearch}>
        <SearchBar broweserFlag={true}>
          <div className="flex flex-col w-full">
            <div className="w-full flex gap-4 justify-between items-center">
              <SearchInput onChange={setSearch} className="w-[85%]" />
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex py-2 items-center text-2xl border border-primary  px-4 rounded-2xl cursor-pointer hover:bg-accent ${
                  filterOpen && "bg-primary text-white"
                }`}
              >
                <Filter className="h-5 w-5 mr-2" /> filter
              </button>
            </div>
            <div
              className="flex flex-col gap-y-4 justify-center"
              hidden={!filterOpen}
            >
              <div className="flex justify-evenly mt-6  ">
                <FilterSelect
                  placeholder="Resource Type"
                  value={type}
                  onChange={setType}
                  className="w-full lg:w-32 text-xl"
                  options={[
                    { value: "book", label: "Textbook" },
                    { value: "slides", label: "Slides" },
                    { value: "exam", label: "Exam" },
                  ]}
                />
                <FilterSelect
                  placeholder="University"
                  value={university}
                  onChange={setUniversity}
                  className="w-full lg:w-86 text-xl"
                  options={universities.map((university) => ({
                    value: university,
                    label: university,
                  }))}
                />

                <FilterSelect
                  placeholder="Faculty"
                  onChange={setFaculty}
                  defaultValue={faculty}
                  className="w-full lg:w-52 text-xl"
                  options={faculties.map((faculty) => ({
                    value: faculty,
                    label: faculty,
                  }))}
                />
                <FilterSelect
                  placeholder="Department"
                  onChange={setDepartment}
                  value={department}
                  className="w-full lg:w-62 text-xl"
                  options={departments[faculty].map((department) => ({
                    value: department,
                    label: department,
                  }))}
                />
              </div>
              <button
                onClick={() => {
                  setSearch("");
                  setUniversity(universities[0]);
                  setFaculty(faculties[0]);
                  setDepartment(departments[faculty][0]);
                  setType("book");
                  setFilterOpen(false);
                }}
                className="bg-primary text-white px-4 py-2 rounded-2xl w-1/3 mx-auto mt-2 cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </SearchBar>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allResources?.map((resource) => {
          return (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onClick={() => console.log(resource)}
            />
          );
        })}
      </div>
      <div className="mt-6 w-full flex justify-center">
        <UsePagination
          currentPage={page}
          setCurrentPage={setPage}
          totalItems={totalItems}
          limit={limit}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default BrowesResourcePage;
