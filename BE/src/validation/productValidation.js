import vine from '@vinejs/vine'

const schema = vine.object({
    title: vine.string().minLength(1), // Validate title là chuỗi và bắt buộc
    category: vine.string().minLength(1), // Validate ObjectId của Mongoose
    description: vine.string().optional(), // Validate description là chuỗi không bắt buộc
    sizes: vine.array(vine.string()).optional(), // Validate sizes là mảng chuỗi không bắt buộc
    variants: vine.array(
        vine.object({
            color: vine.string().minLength(1),
            stock: vine.number().min(0),
            price: vine.number().min(0),
            thumbnail: vine.string().optional(),
        })
    ).optional(), // Validate variants là mảng không bắt buộc
    slug: vine.string().minLength(1)
})

const productValidation = vine.compile(schema);

export default productValidation;
