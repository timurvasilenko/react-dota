import { fetchHeroStats, type HeroStatsType } from "@/api/heroes";
import { useQuery } from "@tanstack/react-query";
import HeroList from "./components/HeroList";

import { useState } from "react";

import HeroCard from "../../components/HeroCard";
import { Button } from "@/components/ui/button";
import HeroDetails from "../../components/HeroDetails";
import { motion } from "motion/react";
import LoadingBadge from "@/components/LoadingBadge";
import { CircleQuestionMarkIcon } from "lucide-react";

const RandomHeroPage = () => {
    const [sheetState, setSheetState] = useState(false);
    const [heroInfo, setHeroInfo] = useState<HeroStatsType | null>(null);

    const [randomHero, setRandomHero] = useState<HeroStatsType | null>(null);

    const {
        data: heroes,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["fetchHeroes"], // уникальный ключ кэша
        queryFn: fetchHeroStats, // функция загрузки
        staleTime: 1000 * 60 * 60, // необязательное: кэш 1 час
    });

    const heroClickHandler = (id: number) => {
        const heroInfo = heroes?.find((hero) => hero.id === id);
        if (heroInfo) {
            setHeroInfo(heroInfo);
            setSheetState(true);
            console.log(heroInfo);
        }
    };

    const sheetToggleHandler = (state: boolean) => {
        if (sheetState !== state) {
            setSheetState(state);
        }
    };

    const updateRandomHero = () => {
        if (heroes) {
            const idx = Math.floor(Math.random() * heroes.length);
            setRandomHero(heroes[idx]);
        }
    };

    return (
        <div className="max-w-[1200px] flex flex-col gap-2 items-center my-6">
            {isLoading && <LoadingBadge />}
            {isError && "Data fetching error!"}
            {randomHero && (
                <motion.div
                    className="w-40 mt-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: {
                            type: "spring",
                            visualDuration: 0.2,
                            bounce: 0.5,
                        },
                    }}
                    key={randomHero.id}
                >
                    <HeroCard
                        hero={randomHero}
                        onHeroClick={heroClickHandler}
                    />
                </motion.div>
            )}
            {!randomHero && (
                <motion.div
                    className="w-40 h-[115px] flex items-center justify-center border-accent border-2 rounded-sm"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: {
                            type: "spring",
                            visualDuration: 0.2,
                            bounce: 0.5,
                        },
                    }}
                >
                    <CircleQuestionMarkIcon className="size-10" />
                </motion.div>
            )}
            {!isLoading && !isError && heroes && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.4,
                            scale: {
                                type: "spring",
                                visualDuration: 0.2,
                                bounce: 0.5,
                            },
                        }}
                    >
                        <Button
                            onClick={updateRandomHero}
                            className="cursor-pointer w-40"
                        >
                            Roll
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="flex flex-col gap-8 p-2"
                    >
                        <HeroList
                            heroes={heroes
                                .filter((hero) => hero.primary_attr === "str")
                                .sort()
                                .sort((a, b) =>
                                    a.localized_name.localeCompare(
                                        b.localized_name
                                    )
                                )}
                            onHeroClick={heroClickHandler}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "agi"
                            )}
                            onHeroClick={heroClickHandler}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "int"
                            )}
                            onHeroClick={heroClickHandler}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "all"
                            )}
                            onHeroClick={heroClickHandler}
                        />
                    </motion.div>
                </>
            )}
            {heroInfo && (
                <HeroDetails
                    sheetState={sheetState}
                    sheetToggleHandler={sheetToggleHandler}
                    heroInfo={heroInfo}
                />
            )}
        </div>
    );
};

export default RandomHeroPage;
