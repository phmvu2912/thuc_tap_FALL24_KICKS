import vine from '@vinejs/vine'

const schema = vine.object({
    name: vine.string().minLength(1), // Validate email
})

const categoryValidation = vine.compile(schema);

export default categoryValidation;