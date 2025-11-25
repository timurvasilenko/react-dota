import { fetchHeroStats, type HeroStatsType } from "@/api/heroes";
import { useQuery } from "@tanstack/react-query";
import HeroList from "./components/HeroList";

import { useId, useRef, useState } from "react";

import HeroCard from "../../components/HeroCard";
import { Button } from "@/components/ui/button";
import HeroDetails from "../../components/HeroDetails";
import { motion } from "motion/react";
import LoadingBadge from "@/components/LoadingBadge";
import { CircleQuestionMarkIcon, DicesIcon } from "lucide-react";
import { getUniqueRandomIntegers } from "@/utils/arrays";
import { cn } from "@/lib/utils";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const ROLL_FILLERS_COUNT = 30;
const ROLL_TARGET_INDEX = ROLL_FILLERS_COUNT / 2;

const RandomHeroPage = () => {
    const [sheetState, setSheetState] = useState(false);
    const [heroInfo, setHeroInfo] = useState<HeroStatsType | null>(null);
    const [randomHeroes, setRandomHeroes] = useState<HeroStatsType[]>([]);
    const [generation, setGeneration] = useState(0);
    const [isRollFinished, setRollFinished] = useState(true);

    const carouselRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

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

    const updateRandomHeroes = () => {
        if (heroes) {
            const rndIndexes = getUniqueRandomIntegers(
                ROLL_FILLERS_COUNT + 1,
                0,
                heroes.length - 1
            );
            const newRandomHeroes = rndIndexes.map((index) => heroes[index]);
            setRandomHeroes(newRandomHeroes);
            setGeneration((prev) => prev + 1);
            console.log("newRandomHeroes", newRandomHeroes);
        }
    };

    const roll = () => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Сбрасываем прошлую анимацию
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }

        carousel.scrollLeft = 0;

        updateRandomHeroes();
        setRollFinished(false);

        // Ждём следующего кадра, чтобы DOM обновился
        requestAnimationFrame(() => {
            const target = carousel.scrollWidth / 2 - carousel.clientWidth / 2;
            const start = carousel.scrollLeft;
            const distance = target - start;
            const duration = 5000; // 7 секунд
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const t = Math.min(1, elapsed / duration);
                const eased = easeOutCubic(t);

                carousel.scrollLeft = start + distance * eased;

                if (t < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setRollFinished(true);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        });
    };

    const uid = useId();

    return (
        <div className="flex flex-col gap-2 items-center my-6">
            <div className="w-full flex flex-col gap-3 items-center relative mb-3">
                <div className="absolute left-0 w-[15%] bg-linear-to-r from-[oklch(0.145_0_0)] h-full z-1"></div>
                <div className="absolute right-0 w-[15%] bg-linear-to-l from-[oklch(0.145_0_0)] h-full z-1"></div>
                <motion.div
                    className="h-36 flex items-center w-full overflow-x-hidden p-4 gap-6 border-accent border-y-2"
                    ref={carouselRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        scale: {
                            type: "spring",
                            visualDuration: 0.2,
                            bounce: 0.5,
                        },
                    }}
                >
                    {randomHeroes.length === 0 && (
                        <div className="w-full flex justify-center">
                            <div className="w-40 h-[100px] flex items-center justify-center border-accent border-2 rounded-sm">
                                <CircleQuestionMarkIcon className="size-10 text-secondary" />
                            </div>
                        </div>
                    )}
                    {randomHeroes.map((hero, idx) => (
                        <motion.div
                            className={cn(
                                "w-40 shrink-0 transition-transform durtion-1000",
                                idx !== ROLL_TARGET_INDEX &&
                                    "pointer-events-none",
                                idx === ROLL_TARGET_INDEX &&
                                    !isRollFinished &&
                                    "pointer-events-none"
                            )}
                            initial={{
                                opacity: 0,
                                scale: 1,
                                translateX: 20,
                            }}
                            animate={{
                                opacity:
                                    idx !== ROLL_TARGET_INDEX && isRollFinished
                                        ? 0.2
                                        : 1,
                                scale: 1,
                                translateX: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                scale: {
                                    type: "tween",
                                    visualDuration: 0.2,
                                    bounce: 0.5,
                                },
                            }}
                            key={`${uid}-${generation}-${hero.id}`}
                        >
                            <HeroCard
                                hero={hero}
                                onHeroClick={heroClickHandler}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {isLoading && <LoadingBadge />}
            {isError && "Data fetching error!"}
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
                            onClick={roll}
                            className="cursor-pointer"
                            disabled={!isRollFinished}
                        >
                            <DicesIcon className="size-4" />
                            Roll
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 1,
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
