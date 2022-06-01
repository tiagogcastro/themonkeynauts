import { AppError } from '@shared/errors/app-error';
import { getRandomInt } from './get-random-int';

type Rarity = {
  [key: string]: [number, number];
};

type RarityData = {
  [key: string]: number;
};

type Response<T> = Uppercase<keyof T & string>;

export async function rarity<T extends RarityData>(
  rarity_data: T,
): Promise<Response<T>> {
  const rarityPercentages = Object.values(rarity_data) as number[];

  const total = rarityPercentages.reduce(
    (percentage, previous_percentage) => percentage + previous_percentage,
    0,
  );

  if (total !== 100) {
    throw new AppError('Rarity percentages must add up to 100', 409);
  }

  const rarityKeys = Object.keys(rarity_data);

  let rarityPercentageEnd = 0;
  let rarityPercentageStart = 1;

  const formattedRarity = rarityPercentages.reduce(
    (previous_rarity, current_percentage, index) => {
      const percentage = rarityPercentages[index];
      const rarityKey = rarityKeys[index];
      const previousRarityKey = rarityKeys[index - 1];

      if (previous_rarity[previousRarityKey]) {
        rarityPercentageStart = previous_rarity[previousRarityKey][1] + 1;
      }

      rarityPercentageEnd += percentage;

      return {
        ...previous_rarity,
        [rarityKey]: [rarityPercentageStart, rarityPercentageEnd],
      } as Rarity;
    },
    {} as Rarity,
  );

  const generatedInt = getRandomInt(1, 100);

  const formattedRarityPorcentages = Object.values(formattedRarity);

  const rarityKey = await new Promise<string>((resolve, reject) => {
    for (let index = 0; index < formattedRarityPorcentages.length; index += 1) {
      const [_rarityPercentageStart, _rarityPercentageEnd] =
        formattedRarityPorcentages[index];

      if (
        generatedInt >= _rarityPercentageStart &&
        generatedInt <= _rarityPercentageEnd
      ) {
        resolve(rarityKeys[index]);

        break;
      }
    }

    reject();
  });

  return rarityKey.toUpperCase() as Response<T>;
}
