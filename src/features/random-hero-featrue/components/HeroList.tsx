import type { HeroStatsListType } from "@/api/heroes";
import HeroCard from "./HeroCard";

const HeroList = ({ heroes }: { heroes: HeroStatsListType }) => {
    return (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11">
            {heroes
                .sort((a, b) =>
                    a.localized_name.localeCompare(b.localized_name)
                )
                .map((hero) => (
                    <HeroCard hero={hero} />
                ))}
        </div>
    );
};

export default HeroList;
