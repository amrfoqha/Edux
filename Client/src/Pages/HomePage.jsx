import HeroSection from "../components/Home/HeroSection";
import FeaturesGrid from "../components/Home/FeaturesGrid";
import TrendingSection from "../components/Home/TrendingSection";
import CTASection from "../components/Home/CTASection";
import FilterSelect from "../Components/shared/FilterSelect.jsx";
import SearchInput from "../Components/shared/SearchInput.jsx";
import SearchBar from "../Components/shared/SearchBar.jsx";
import {useState} from "react";
import Footer from "../Components/Footer.jsx";

export default function HomePage({ onNavigate, trendingResources }) {
    const [search, setSearch] = useState("")
    const [university, setUniversity] = useState("")
    const [type, setType] = useState("")
  return (
      <div className="min-h-screen">
        <HeroSection onNavigate={onNavigate} >
            <SearchBar onSearch={() => onNavigate("browse")}>
                <SearchInput
                    value={search}
                    onChange={setSearch}
                />

                <FilterSelect
                    placeholder="University"
                    value={university}
                    onChange={setUniversity}
                    className="w-full lg:w-52"
                    options={[
                        { value: "mit", label: "MIT" },
                        { value: "stanford", label: "Stanford" },
                    ]}
                />

                <FilterSelect
                    placeholder="Type"
                    value={type}
                    onChange={setType}
                    className="w-full lg:w-40"
                    options={[
                        { value: "book", label: "Textbook" },
                        { value: "slides", label: "Slides" },
                    ]}
                />
            </SearchBar>
        </HeroSection>
        <FeaturesGrid />
        <TrendingSection
            resources={trendingResources}
            onNavigate={onNavigate}
        />
        <CTASection onNavigate={onNavigate} />
          <Footer/>
      </div>
  );
}
