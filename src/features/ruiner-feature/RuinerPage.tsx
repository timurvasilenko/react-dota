import { fetchHeroStats, type HeroStatsType } from "@/api/heroes";
import { fetchItems, type ItemType } from "@/api/items";
import { Button } from "@/components/ui/button";
import { getUniqueRandomIntegers } from "@/utils/arrays";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import RandomCard from "./components/RandomCard";
import LoadingBadge from "@/components/LoadingBadge";

const HEROES_COUNT = 4;
const ITEMS_PER_HERO = 6;

const RuinerPage = () => {
    const [randomHeroes, setRandomHeroes] = useState<HeroStatsType[]>([]);
    const [randomItems, setRandomItems] = useState<ItemType[][]>([]);

    const {
        data: heroes,
        isLoading: isHeroesLoading,
        isError: isHeroesError,
        error: heroesError,
    } = useQuery({
        queryKey: ["fetchHeroes"], // уникальный ключ кэша
        queryFn: fetchHeroStats, // функция загрузки
        staleTime: 1000 * 60 * 60, // необязательное: кэш 1 час
    });

    const {
        data: items,
        isLoading: isItemsLoading,
        isError: isItemsError,
        error: itemsError,
    } = useQuery({
        queryKey: ["fetchItems"], // уникальный ключ кэша
        queryFn: fetchItems, // функция загрузки
        staleTime: 1000 * 60 * 60, // необязательное: кэш 1 час
    });

    const isDataLoading = () => {
        return isHeroesLoading || isItemsLoading;
    };

    const isDataError = () => {
        return isHeroesError || isItemsError;
    };

    const getRandomHeroes = () => {
        if (heroes) {
            const rndIndexes = getUniqueRandomIntegers(
                HEROES_COUNT,
                0,
                heroes.length - 1
            );
            const newRandomHeroes = rndIndexes.map((index) => heroes[index]);
            setRandomHeroes(newRandomHeroes);
            console.log("newRandomHeroes", newRandomHeroes);
        }
    };

    useEffect(() => {
        if (isHeroesError) {
            console.log(heroesError);
        }
    }, [isHeroesError]);

    useEffect(() => {
        if (isItemsError) {
            console.log(itemsError);
        }
    }, [isItemsError]);

    const getRandomItems = () => {
        // TOFIX тут есть какой-то странный баг. Иногда в одном из массивов вместо айтема подсовывается undefined. Из-за этого ломается страница.

        /*
            TODO нужно отсеивать лишние предметы
            Пока что в голову приходит следующие способы, которые можно комбинировать:
            1) Проверка названия. Например, у чар name начинается с "enhancement_", а у рецептов с "recipe_".
            2) Исключить айтемы, у которых пустое поле dname (null/undefined). Такие, как я понимаю, не используются в игре в данный момент.
            4) Можно отсеивать все предметы с cost = 0, а может и ещё по каким-то полям, которые я изначально не добавил в модель.
            3) Составить чёрный список айдишников для предметов, которые никак не исключить по названию.
        */
        if (items) {
            let newRandomItems = [];
            const filteredItems = filterItems(items);
            for (let i = 0; i < HEROES_COUNT; i++) {
                const rndBootsIndexes = getUniqueRandomIntegers(1, 0, 4);
                const boots = rndBootsIndexes.map(
                    (index) => bootsItems(items)[index]
                );

                const rndIndexes = getUniqueRandomIntegers(
                    ITEMS_PER_HERO - 1,
                    0,
                    filteredItems.length - 1
                );
                newRandomItems.push([
                    ...boots,
                    ...rndIndexes.map((index) => filteredItems[index]),
                ]);
            }
            setRandomItems(newRandomItems);
        }
    };

    const bootsItems = (items: ItemType[]) => {
        let bootsIds = [
            50, //Phase Boots
            63, //Power Treads
            220, //Boots of Travel 2
            231, //Guardian Greaves
            931, //Boots of Bearing
        ];
        return items.filter((item) => bootsIds.includes(item.id));
    };

    const filterItems = (items: ItemType[]) => {
        const substringBlacklist = ["recipe_", "enchantment_", "_token"];
        const idBlacklist = [
            50, //Phase Boots
            63, //Power Treads
            220, //Boots of Travel 2
            231, //Guardian Greaves
            931, //Boots of Bearing

            36, //Magic Wand
            48, //Boots of Travel
            65, //Hand of Midas
            67, //Oblivion Staff
            69, //Perseverance
            73, //Bracer
            75, //Wraith Band
            77, //Null Talisman
            79, //Mekansm
            86, //Buckler
            88, //Ring of Basilius
            92, //Urn of Shadows
            94, //Headdress
            98, //Orchid Malevolence
            100, //Eul's Scepter of Divinity
            102, //Force Staff
            106, //Necronomicon 1
            108, //Aghanim's Scepter
            125, //Vanguard
            129, //Soul Booster
            143, //Skull Basher
            149, //Crystalys
            152, //Shadow Blade
            162, //Sange
            164, //Helm of the Dominator
            166, //Maelstrom
            170, //Yasha
            174, //Diffusal Blade
            178, //Soul Ring
            180, //Arcane Boots
            185, //Drum of Endurance
            187, //Medallion of Courage
            190, //Veil of Discord
            193, //Necronomicon 2
            194, //Necronomicon 3
            196, //Diffusal Blade
            206, //Rod of Atos
            214, //Tranquil Boots
            218, //Observer and Sentry Wards
            232, //Aether Lens
            236, //Dragon Lance
            252, //Echo Sabre
            259, //Kaya
            271, //Aghanim's Blessing
            369, //Trident
            534, //Witch Blade
            569, //Orb of Corrosion
            596, //Falcon Blade
            1095, //Lunar Crest
            1107, //Phylactery
            1128, //Pavise
        ];

        return items.filter((item) => {
            if (!item.dname) {
                return false;
            }

            if (item.cost === 0) {
                return false;
            }

            let isInSubstringBlacklist = false;
            for (const substring of substringBlacklist) {
                if (item.name.includes(substring)) {
                    isInSubstringBlacklist = true;
                    break;
                }
            }
            if (isInSubstringBlacklist) {
                return false;
            }

            if (!item.components) {
                return false;
            }

            let isInIdBlacklist = false;
            for (const id of idBlacklist) {
                if (item.id === id) {
                    isInIdBlacklist = true;
                    break;
                }
            }
            if (isInIdBlacklist) {
                return false;
            }

            return true;
        });
    };

    const shuffle = () => {
        getRandomHeroes();
        getRandomItems();
    };

    const uid = useId();

    return (
        <div className="max-w-[1200px] flex flex-col gap-2 items-center my-6">
            {isDataLoading() && <LoadingBadge />}
            {isDataError() && "Data fetching error!"}
            {!isDataLoading() && !isDataError() && (
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
                        <Button onClick={shuffle} className="cursor-pointer">
                            To Hell and Back!
                        </Button>
                    </motion.div>
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
                        className="p-4 flex gap-10"
                    >
                        {randomHeroes.map((hero, heroIdx) => (
                            <RandomCard
                                hero={hero}
                                items={randomItems[heroIdx]}
                                key={`${uid}-${hero.id}`}
                                nth={heroIdx}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default RuinerPage;
