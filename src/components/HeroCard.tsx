import { STEAM_CDN_API } from "@/api/base-urls";
import type { HeroStatsType } from "@/api/heroes";

const HeroCard = ({
    hero,
    onHeroClick,
}: {
    hero: HeroStatsType;
    onHeroClick: (id: number) => void;
}) => {
    return (
        <div
            className="group bg-accent rounded-sm flex flex-col relative overflow-hidden border-2 cursor-pointer"
            onClick={() => {
                onHeroClick(hero.id);
            }}
        >
            <img
                src={`${STEAM_CDN_API}${hero.img}`}
                alt={hero.localized_name}
                className="group-hover:blur-md"
            />
            {/* <span className="text-gray-400">#{hero.id}</span>{" "} */}
            <div className="font-bold absolute opacity-0 group-hover:opacity-100 transtion-all text-sm flex text-center justify-center items-center w-full h-full px-2">
                {hero.localized_name}
            </div>
        </div>
    );
};

export default HeroCard;
