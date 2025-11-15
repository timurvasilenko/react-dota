const API_DOMAIN = "https://api.opendota.com";
import * as z from "zod";

const HeroModel = z.object({
    id: z.number(),
    name: z.string(),
    localized_name: z.string(),
    primary_attr: z.string(),
    attack_type: z.string(),
    roles: z.array(z.string()),
    legs: z.number(),
});
const HeroesListModel = z.array(HeroModel);

export type HeroType = z.infer<typeof HeroModel>;
export type HeroListType = z.infer<typeof HeroesListModel>;

export const fetchHeroes = async () => {
    const res = await fetch(`${API_DOMAIN}/api/heroes`);

    if (!res.ok) {
        throw new Error("Failed to load data");
    }

    const resJson = await res.json();

    return HeroesListModel.parseAsync(resJson);
};

const HeroStatsModel = z.object({
    id: z.number(),
    name: z.string(),
    primary_attr: z.string(),
    attack_type: z.string(),
    roles: z.array(z.string()),
    img: z.string(),
    icon: z.string(),

    base_health: z.number(),
    base_health_regen: z.number().nullable(),
    base_mana: z.number(),
    base_mana_regen: z.number(),
    base_armor: z.number(),
    base_mr: z.number(),
    base_attack_min: z.number(),
    base_attack_max: z.number(),
    base_str: z.number(),
    base_agi: z.number(),
    base_int: z.number(),
    str_gain: z.number(),
    agi_gain: z.number(),
    int_gain: z.number(),
    attack_range: z.number(),
    projectile_speed: z.number(),
    attack_rate: z.float32(),
    base_attack_time: z.number(),
    attack_point: z.number(),
    move_speed: z.number(),
    turn_rate: z.number().nullable(),
    cm_enabled: z.boolean(),
    legs: z.number(),
    day_vision: z.number(),
    night_vision: z.number(),
    localized_name: z.string(),

    // Поля вида "1_pick"
    "1_pick": z.number(),
    "1_win": z.number(),
    "2_pick": z.number(),
    "2_win": z.number(),
    "3_pick": z.number(),
    "3_win": z.number(),
    "4_pick": z.number(),
    "4_win": z.number(),
    "5_pick": z.number(),
    "5_win": z.number(),
    "6_pick": z.number(),
    "6_win": z.number(),
    "7_pick": z.number(),
    "7_win": z.number(),
    "8_pick": z.number(),
    "8_win": z.number(),

    turbo_picks: z.number(),
    turbo_picks_trend: z.array(z.number()),
    turbo_wins: z.number(),
    turbo_wins_trend: z.array(z.number()),

    pro_pick: z.number(),
    pro_win: z.number(),
    pro_ban: z.number(),

    pub_pick: z.number(),
    pub_pick_trend: z.array(z.number()),
    pub_win: z.number(),
    pub_win_trend: z.array(z.number()),
});
const HeroStatsListModel = z.array(HeroStatsModel);

export type HeroStatsType = z.infer<typeof HeroStatsModel>;
export type HeroStatsListType = z.infer<typeof HeroStatsListModel>;

export const fetchHeroStats = async () => {
    const res = await fetch(`${API_DOMAIN}/api/heroStats`);

    if (!res.ok) {
        throw new Error("Failed to load data");
    }

    const resJson = await res.json();

    const parsed = await HeroStatsListModel.safeParseAsync(resJson);

    if (!parsed.success) {
        // parsed.error — ZodError
        console.error(
            "Hero stats validation failed (safeParse):",
            JSON.stringify(parsed.error.issues, null, 2)
        );
        // можно вернуть fallback значение или бросить кастомную ошибку
        throw new Error("Hero stats validation failed");
    }

    return HeroStatsListModel.parseAsync(resJson);
};
