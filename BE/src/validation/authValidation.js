import vine from '@vinejs/vine'

const schema = vine.object({
    email: vine.string().email().minLength(1), // Validate email
    username: vine.string().minLength(1).optional(), // Validate title là chuỗi và bắt buộc
    password: vine.string().minLength(1), // Validate ObjectId của Mongoose
})

const authValidation = vine.compile(schema);

export default authValidation;