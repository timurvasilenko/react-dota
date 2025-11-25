import type { HeroStatsType } from "@/api/heroes";
import type { ItemType } from "@/api/items";
import HeroCard from "@/components/HeroCard";
import ItemCard from "@/components/ItemCard";
import { motion } from "motion/react";
import { useId } from "react";

const RandomCard = ({
    hero,
    items,
    nth,
}: {
    hero: HeroStatsType;
    items: ItemType[];
    nth: number;
}) => {
    const uid = useId();
    return (
        <motion.div
            className="flex flex-col gap-4 w-55 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: 0.1 * (nth + 1),
                scale: {
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.5,
                },
                translateY: {
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.5,
                },
            }}
        >
            <HeroCard hero={hero} onHeroClick={() => {}} />

            {/* <div className="flex w-full justify-center">
                <div className="w-40 h-0.5 bg-accent rounded-full"></div>
            </div> */}
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <ItemCard item={item} key={`${uid}-${item.id}`} />
                ))}
            </div>
        </motion.div>
    );
};

export default RandomCard;
