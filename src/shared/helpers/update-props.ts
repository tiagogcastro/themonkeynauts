import { AppError } from '@shared/errors/app-error';

function updateProps<T>(props: T): T {
  const updateData = {} as T;

  const propertyKeys = Object.keys(props) as (keyof T)[];

  propertyKeys.forEach(propertyKey => {
    const propertyValue = props[propertyKey] as any;

    if (propertyValue !== undefined && propertyValue !== null)
      updateData[propertyKey] = propertyValue;
  });

  const updateDataCount = Object.keys(updateData).length;

  if (updateDataCount === 0) {
    throw new AppError('No data to update', 400);
  }

  return updateData;
}

export { updateProps };
