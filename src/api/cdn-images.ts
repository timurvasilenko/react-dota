import { STEAM_CDN_API } from "./base-urls";

export const getHeroRenderURLList = (name: string) => {
    const RENDERS_PATH = "/apps/dota2/videos/dota_react/heroes/renders/";
    const fileName = name.replace("npc_dota_hero_", "");
    const URLs = {
        poster: `${STEAM_CDN_API}${RENDERS_PATH}${fileName}.png`,
        mp4: `${STEAM_CDN_API}${RENDERS_PATH}${fileName}.mov`,
        webm: `${STEAM_CDN_API}${RENDERS_PATH}${fileName}.webm`,
    };
    return URLs;
};

export const getHeroStatsIconURLs = () => {
    const ICONS_PATH = "/apps/dota2/images/dota_react/icons/";
    const ICONS_STATS_PATH = "/apps/dota2/images/dota_react/heroes/stats/";
    const URLs = {
        hero_strength: `${STEAM_CDN_API}${ICONS_PATH}hero_strength.png`,
        hero_agility: `${STEAM_CDN_API}${ICONS_PATH}hero_agility.png`,
        hero_intelligence: `${STEAM_CDN_API}${ICONS_PATH}hero_intelligence.png`,
        hero_universal: `${STEAM_CDN_API}${ICONS_PATH}hero_universal.png`,
        ranged: `${STEAM_CDN_API}${ICONS_PATH}ranged.svg`,
        melee: `${STEAM_CDN_API}${ICONS_PATH}melee.svg`,
        icon_damage: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_damage.png`,
        icon_attack_time: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_attack_time.png`,
        icon_attack_range: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_attack_range.png`,
        icon_projectile_speed: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_projectile_speed.png`,
        icon_armor: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_armor.png`,
        icon_magic_resist: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_magic_resist.png`,
        icon_movement_speed: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_movement_speed.png`,
        icon_turn_rate: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_turn_rate.png`,
        icon_vision: `${STEAM_CDN_API}${ICONS_STATS_PATH}icon_vision.png`,
    };
    return URLs;
};
