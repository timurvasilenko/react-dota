import * as z from "zod";
import { OPENDOTA_API } from "./base-urls";

const RawItemsModel = z.record(
    z.string(),
    z.object({
        id: z.number(),
        dname: z.string().optional(),
        img: z.string(),
        cost: z.number().nullish(),
        components: z.array(z.string()).nullish(),
    })
);

const ItemModel = z.object({
    id: z.number(),
    name: z.string(),
    dname: z.string().optional(),
    img: z.string(),
    cost: z.number().nullish(),
    components: z.array(z.string()).nullish(),
    // qual: z.string(),
});

const ItemsListModel = z.array(ItemModel);

export type ItemType = z.infer<typeof ItemModel>;
export type ItemListType = z.infer<typeof ItemsListModel>;

export const fetchItems = async () => {
    const URL = `${OPENDOTA_API}/constants/items`;
    const res = await fetch(URL);

    if (!res.ok) {
        throw new Error(`Failed to load data from ${URL}`);
    }

    const resJson = await res.json();
    const parsedRaw = RawItemsModel.parse(resJson);
    console.log("check2", parsedRaw);
    const items = Object.entries(parsedRaw).map(([name, item]) => ({
        name,
        ...item,
    }));

    return items;
};
