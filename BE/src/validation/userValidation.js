import vine from '@vinejs/vine'

const schema = vine.object({
    email: vine.string().email().minLength(1), 
    username: vine.string().minLength(1).optional(), 
    password: vine.string().minLength(1), 
    role: vine.enum(['admin', 'staff', 'user']).optional()
})

const userValidation = vine.compile(schema);

export default userValidation;