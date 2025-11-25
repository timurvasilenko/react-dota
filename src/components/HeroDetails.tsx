import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { getHeroRenderURLList, getHeroStatsIconURLs } from "@/api/cdn-images";
import { type HeroStatsType } from "@/api/heroes";

const HeroDetails = ({
    sheetState,
    sheetToggleHandler,
    heroInfo,
}: {
    sheetState: boolean;
    sheetToggleHandler: (state: boolean) => void;
    heroInfo: HeroStatsType;
}) => {
    const heroRenderURLs = getHeroRenderURLList(heroInfo.name);

    const getIconByAttackType = (type: string) => {
        console.log(type);
        if (type === "Ranged") return icons.ranged;
        if (type === "Melee") return icons.melee;
    };

    const icons = getHeroStatsIconURLs();

    const getIconByAttr = (attr: string) => {
        if (attr === "str") return icons.hero_strength;
        if (attr === "agi") return icons.hero_agility;
        if (attr === "int") return icons.hero_intelligence;
        if (attr === "all") return icons.hero_universal;
    };

    const getAttrDamage = (hero: HeroStatsType) => {
        if (hero.primary_attr === "str") return hero.base_str;
        if (hero.primary_attr === "agi") return hero.base_agi;
        if (hero.primary_attr === "int") return hero.base_int;
        if (hero.primary_attr === "all")
            return Math.floor(
                (hero.base_str + hero.base_agi + hero.base_int) * 0.45
            );
        return 0;
    };

    return (
        <>
            <Sheet open={sheetState} onOpenChange={sheetToggleHandler}>
                <SheetContent className="flex flex-col items-center w-full sm: sm:w-[370px]">
                    <SheetHeader>
                        <SheetTitle className="text-lg flex justify-center items-center gap-2">
                            <img
                                src={getIconByAttackType(heroInfo.attack_type)}
                                alt="Attack type"
                                className="size-5"
                            />
                            {heroInfo?.localized_name}
                        </SheetTitle>
                        <SheetDescription className="flex flex-col gap-2">
                            <div className="w-full flex flex-col gap-1">
                                {/* <img
                                        src={`${STEAM_CDN_API}${heroInfo.img}`}
                                        alt={heroInfo.localized_name}
                                        className="rounded-xl border-2"
                                    /> */}
                                {heroRenderURLs && (
                                    <video
                                        poster={heroRenderURLs.poster}
                                        autoPlay
                                        preload="auto"
                                        loop
                                        playsInline
                                        className="aspect-square size-full"
                                    >
                                        <source
                                            type='video/mp4; codecs="hvc1"'
                                            src={heroRenderURLs.mp4}
                                        />
                                        <source
                                            type="video/webm"
                                            src={heroRenderURLs.webm}
                                        />
                                        <img src={heroRenderURLs.poster} />
                                    </video>
                                )}

                                <div className="bg-green-400/85 text-shadow-lg font-medium relative text-center rounded-xs h-6 w-full">
                                    <span className="text-gray-50 text-lg leading-6">
                                        {heroInfo.base_health +
                                            heroInfo.base_str * 22}
                                    </span>
                                    <span className="absolute right-2 text-gray-600 text-xs leading-6">
                                        +
                                        {(
                                            (heroInfo.base_health_regen ?? 0) +
                                            heroInfo.base_str * 0.1 +
                                            ""
                                        ).substring(0, 3)}
                                    </span>
                                </div>
                                <div className="bg-blue-400/85 text-shadow-lg font-medium relative text-center rounded-xs h-6 w-full">
                                    <span className="text-gray-50 text-lg leading-6">
                                        {heroInfo.base_mana +
                                            heroInfo.base_int * 12}
                                    </span>
                                    <span className="absolute right-2 text-gray-800 text-xs leading-6">
                                        +
                                        {(
                                            heroInfo.base_mana_regen +
                                            heroInfo.base_int * 0.05 +
                                            ""
                                        ).substring(0, 3)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-1.5 justify-center">
                                {heroInfo.primary_attr === "all" && (
                                    <Badge variant="secondary">
                                        <img
                                            src={getIconByAttr("all")}
                                            alt="Primary attribute"
                                            className="size-5"
                                        />
                                        <span className="text-[1rem]">
                                            {heroInfo.base_str +
                                                heroInfo.base_agi +
                                                heroInfo.base_int}
                                        </span>
                                    </Badge>
                                )}
                                <Badge
                                    variant={
                                        heroInfo.primary_attr === "str"
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    <img
                                        src={getIconByAttr("str")}
                                        alt="Primary attribute"
                                        className="size-5"
                                    />
                                    <span className="text-[1rem]">
                                        {heroInfo.base_str}
                                    </span>
                                    <span className="text-md text-gray-400">
                                        +{heroInfo.str_gain}
                                    </span>
                                </Badge>
                                <Badge
                                    variant={
                                        heroInfo.primary_attr === "agi"
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    <img
                                        src={getIconByAttr("agi")}
                                        alt="Primary attribute"
                                        className="size-5"
                                    />
                                    <span className="text-[1rem]">
                                        {heroInfo.base_agi}
                                    </span>
                                    <span className="text-md text-gray-400">
                                        +{heroInfo.agi_gain}
                                    </span>
                                </Badge>
                                <Badge
                                    variant={
                                        heroInfo.primary_attr === "int"
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    <img
                                        src={getIconByAttr("int")}
                                        alt="Primary attribute"
                                        className="size-5"
                                    />
                                    <span className="text-[1rem] leading-2">
                                        {heroInfo.base_int}
                                    </span>
                                    <span className="text-md text-gray-400">
                                        +{heroInfo.int_gain}
                                    </span>
                                </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-gray-50 mt-1">
                                <div className="flex flex-col gap-1.5">
                                    <span className="ml-2.5 text-lg">
                                        ATTACK
                                    </span>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_damage}
                                            alt="Attack damage"
                                            className="size-5"
                                        />
                                        {heroInfo.base_attack_min +
                                            getAttrDamage(heroInfo)}
                                        -
                                        {heroInfo.base_attack_max +
                                            getAttrDamage(heroInfo)}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_attack_time}
                                            alt="Attack time"
                                            className="size-5"
                                        />
                                        {(
                                            heroInfo.base_attack_time / 60
                                        ).toFixed(1)}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_attack_range}
                                            alt="Attack range"
                                            className="size-5"
                                        />
                                        {heroInfo.attack_range}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_projectile_speed}
                                            alt="Pojectile speed"
                                            className="size-5"
                                        />
                                        {heroInfo.projectile_speed}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="ml-2.5 text-lg">
                                        DEFENSE
                                    </span>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_armor}
                                            alt="Armor"
                                            className="size-5"
                                        />
                                        {(
                                            heroInfo.base_armor +
                                            heroInfo.base_agi / 6 +
                                            ""
                                        ).substring(0, 3)}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_magic_resist}
                                            alt="Magic resist"
                                            className="size-5"
                                        />
                                        {heroInfo.base_mr}%
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="ml-2.5 text-lg">
                                        MOBILITY
                                    </span>
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_movement_speed}
                                            alt="Movement speed"
                                            className="size-5"
                                        />
                                        {heroInfo.move_speed} ({heroInfo.legs}{" "}
                                        ног)
                                    </div>
                                    {heroInfo.turn_rate && (
                                        <div className="flex gap-1.5">
                                            <img
                                                src={icons.icon_turn_rate}
                                                alt="Magic resist"
                                                className="size-5"
                                            />
                                            {heroInfo.turn_rate}
                                        </div>
                                    )}
                                    <div className="flex gap-1.5">
                                        <img
                                            src={icons.icon_vision}
                                            alt="Magic resist"
                                            className="size-5"
                                        />
                                        {heroInfo.day_vision} /{" "}
                                        {heroInfo.night_vision}
                                    </div>
                                </div>
                            </div>
                            <div className="flex"></div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default HeroDetails;
