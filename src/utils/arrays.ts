// second answer from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const arrayShuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const getUniqueRandomIntegers = (n: number, min: number, max: number) => {
    console.log(n, min, max)
    const range = max - min + 1;
    if (n > range) throw new Error("n is larger than range");

    const values = [];
    for (let i = min; i <= max; i++) values.push(i);

    // Перемешиваем Фишером-Йетсом
    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    return values.slice(0, n);
}
