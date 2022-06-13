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
  rarityData: T,
): Promise<Response<T>> {
  const _rarityPercentages = Object.values(rarityData);

  const oldRarityKeys = Object.keys(rarityData);

  const sorted = getRandomInt(0, oldRarityKeys.length - 1);

  const total = _rarityPercentages.reduce(
    (percentage, previousPercentage) => percentage + previousPercentage,
    0,
  );

  if (total !== 100) {
    throw new AppError('Rarity percentages must add up to 100', 409);
  }

  const _rarityData = oldRarityKeys.reduce(
    (previousRarityData, rarityDataKey) => {
      const percentage = rarityData[rarityDataKey];
      const roundedPercentage = percentage > 1 ? Math.floor(percentage) : 1;

      return {
        ...previousRarityData,
        [rarityDataKey]: roundedPercentage,
      };
    },
    {} as RarityData,
  );

  const oldRarityPercentages = Object.values(_rarityData) as number[];

  const oldTotal = oldRarityPercentages.reduce(
    (percentage, previousPercentage) => percentage + previousPercentage,
    0,
  );

  _rarityData[oldRarityKeys[sorted]] += 100 - oldTotal;

  const rarityPercentages = Object.values(_rarityData) as number[];

  const rarityKeys = Object.keys(_rarityData);

  let rarityPercentageEnd = 0;
  let rarityPercentageStart = 1;

  const formattedRarity = rarityPercentages.reduce(
    (previousRarity, currentPercentage, index) => {
      const percentage = rarityPercentages[index];
      const rarityKey = rarityKeys[index];
      const previousRarityKey = rarityKeys[index - 1];

      if (previousRarity[previousRarityKey]) {
        rarityPercentageStart = previousRarity[previousRarityKey][1] + 1;
      }

      rarityPercentageEnd += percentage;

      return {
        ...previousRarity,
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

    reject(new AppError('Could not generate a rarity', 409));
  });

  return rarityKey.toUpperCase() as Response<T>;
}
