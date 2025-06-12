import vine from '@vinejs/vine';

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email(),
        password: vine.string().trim().minLength(8),
    }),
);

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().maxLength(100),
        email: vine.string().trim().email().unique({ table: 'users', column: 'email' }),
        password: vine.string().trim().minLength(8),
    }),
)

