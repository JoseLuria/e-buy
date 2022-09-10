export const filterProps = (objectToCheck: any, ...allowedFields: string[]) => {
  const finalObject: any = {};

  Object.keys(objectToCheck).forEach((property) => {
    if (allowedFields.includes(property)) {
      finalObject[property] = objectToCheck[property];
    }
  });

  return finalObject;
};

export const newProductProps = [
  "slug",
  "title",
  "description",
  "images",
  "inStock",
  "price",
  "sizes",
  "tags",
  "type",
  "gender",
];

export const orderProps = [
  "id",
  "slug",
  "title",
  "size",
  "quantity",
  "image",
  "price",
  "gender",
];

export const addressProps = [
  "name",
  "address",
  "zip",
  "phone",
  "country",
  "city",
];

export const productProps = [
  "title",
  "slug",
  "description",
  "inStock",
  "price",
];
