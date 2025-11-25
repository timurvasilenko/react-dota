import { STEAM_CDN_API } from "@/api/base-urls";
import type { ItemType } from "@/api/items";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

const ItemCard = ({
    item,
    onItemClick,
}: {
    item: ItemType;
    onItemClick?: (id: number) => void;
}) => {
    return (
        <div
            className={cn(
                "flex gap-3 items-center object-contain h-10 relative",
                onItemClick && "cursor-pointer"
            )}
            onClick={() => {
                onItemClick && onItemClick(item.id);
            }}
        >
            <img
                src={`${STEAM_CDN_API}${item.img}`}
                alt={item.dname}
                className="border-2 border-accent rounded-sm object-contain w-13 h-10 shrink-0 z-1"
            />
            <div className="absolute flex items-center justify-center w-13 h-10">
                <LoaderCircleIcon className="text-accent animate-spin" />
            </div>
            <span className="font-bold text-sm">
                {item.dname ?? (
                    <span className="text-red-400 text-xs">💀 {item.name}</span>
                )}
            </span>
        </div>
    );
};

export default ItemCard;
