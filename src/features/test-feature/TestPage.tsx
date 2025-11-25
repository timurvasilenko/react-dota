import { Button } from "@/components/ui/button";
import { useId, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const TestPage = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [itemsToRoll, setItemsToRoll] = useState<{ name: string }[]>([]);
    const animationRef = useRef<number | null>(null);

    const roll = () => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        // Сбрасываем прошлую анимацию
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }

        carousel.scrollLeft = 0;

        // Формируем элементы
        const newItems: { name: string }[] = [];
        for (let i = 0; i < 20; i++) newItems.push({ name: "filler" });
        newItems.push({ name: "X" });
        for (let i = 0; i < 20; i++) newItems.push({ name: "filler" });

        setItemsToRoll(newItems);

        // Ждём следующего кадра, чтобы DOM обновился
        requestAnimationFrame(() => {
            const target = carousel.scrollWidth / 2 - carousel.clientWidth / 2;
            const start = carousel.scrollLeft;
            const distance = target - start;
            const duration = 5000; // 7 секунд
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                console.log("A");
                const elapsed = currentTime - startTime;
                const t = Math.min(1, elapsed / duration);
                const eased = easeOutCubic(t);

                carousel.scrollLeft = start + distance * eased;

                if (t < 1) {
                    animationRef.current = requestAnimationFrame(animate);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        });
    };

    const uid = useId();

    return (
        <div className="w-full flex flex-col gap-3 items-center">
            <div
                className="h-40 flex w-full bg-accent overflow-x-hidden p-4 gap-10"
                ref={carouselRef}
            >
                {itemsToRoll.map((item, idx) => (
                    <div
                        key={`${uid}-${idx}`}
                        className="w-50 bg-neutral-700 shrink-0 flex items-center justify-center text-3xl"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            <Button className="w-20 cursor-pointer" onClick={roll}>
                Roll
            </Button>
        </div>
    );
};

export default TestPage;
