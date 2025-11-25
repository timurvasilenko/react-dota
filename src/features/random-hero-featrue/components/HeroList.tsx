import type { HeroStatsListType } from "@/api/heroes";
import HeroCard from "../../../components/HeroCard";
import { STEAM_CDN_API } from "@/api/base-urls";
import { useId } from "react";

//https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_str.png

const HeroList = ({
    heroes,
    onHeroClick,
}: {
    heroes: HeroStatsListType;
    onHeroClick: (id: number) => void;
}) => {
    const attr = heroes[0].primary_attr;
    const localized_attr = (() => {
        if (attr === "str") return "Strength";
        if (attr === "agi") return "Agility";
        if (attr === "int") return "Intelligence";
        if (attr === "all") return "Universal";
        return "Unknown attribute 🤨";
    })();
    const attr_icon_url = `${STEAM_CDN_API}/apps/dota2/images/dota_react/icons/hero_${localized_attr.toLocaleLowerCase()}.png`;

    const uid = useId();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <img
                    src={attr_icon_url}
                    alt={localized_attr}
                    className="size-8"
                />
                <h2 className="font-bold">{localized_attr}</h2>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11">
                {heroes
                    .sort((a, b) =>
                        a.localized_name.localeCompare(b.localized_name)
                    )
                    .map((hero, idx) => (
                        <HeroCard
                            hero={hero}
                            onHeroClick={onHeroClick}
                            key={`${uid}-${idx}`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default HeroList;
