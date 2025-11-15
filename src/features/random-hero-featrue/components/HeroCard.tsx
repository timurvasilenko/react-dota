import type { HeroStatsType } from "@/api/heroes";

const IMG_API = "https://cdn.cloudflare.steamstatic.com";

const HeroCard = ({ hero }: { hero: HeroStatsType }) => {
    return (
        <div className="group bg-accent rounded-md flex flex-col relative overflow-hidden border-2">
            <img
                src={`${IMG_API}${hero.img}`}
                alt={hero.localized_name}
                className="group-hover:blur-md transtion-all"
            />
            {/* <span className="text-gray-400">#{hero.id}</span>{" "} */}
            <div className="font-bold absolute opacity-0 group-hover:opacity-100 transtion-all text-sm flex text-center justify-center items-center w-full h-full px-2">
                {hero.localized_name}
            </div>
        </div>
    );
};

export default HeroCard;
