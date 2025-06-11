import vine from '@vinejs/vine';

  // Validasi schema
  export const validationData = vine.compile(
    vine.object({
        name: vine.string().trim().maxLength(100),
        description: vine.string().trim().maxLength(500),
        price: vine.number(),
        stock: vine.number(),
    }),
  );

