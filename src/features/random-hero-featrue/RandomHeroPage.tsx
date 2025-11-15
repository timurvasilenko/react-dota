import { fetchHeroes, fetchHeroStats } from "@/api/heroes";
import { useQuery } from "@tanstack/react-query";
import HeroList from "./components/HeroList";

const RandomHeroPage = () => {
    const {
        data: heroes,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["fetchHeroes"], // уникальный ключ кэша
        queryFn: fetchHeroStats, // функция загрузки
        staleTime: 1000 * 60 * 60, // необязательное: кэш 1 час
    });
    return (
        <div className="max-w-[1200px]">
            <h1>Random Hero page</h1>
            {isLoading && "Loading..."}
            {isError && "Data fetching error!"}
            <div className="flex flex-col gap-8 p-2">
                {!isLoading && !isError && heroes && (
                    <>
                        <HeroList
                            heroes={heroes
                                .filter((hero) => hero.primary_attr === "str")
                                .sort()
                                .sort((a, b) =>
                                    a.localized_name.localeCompare(
                                        b.localized_name
                                    )
                                )}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "agi"
                            )}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "int"
                            )}
                        />
                        <HeroList
                            heroes={heroes.filter(
                                (hero) => hero.primary_attr === "all"
                            )}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default RandomHeroPage;
