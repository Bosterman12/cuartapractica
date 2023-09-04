import { fakerES } from "@faker-js/faker";

export const generateUser = () => {
    return {
        name : fakerES.person.firstName(),
        last_name : fakerES.person.lastName(),
        email : fakerES.internet.email(),
        phone_number : fakerES.phone.number()

    }
}

export const generateProducts = () => {
    return {
        title : fakerES.commerce.productName(),
        price : fakerES.commerce.price(),
        stock: 10,
        image : fakerES.image.urlPicsumPhotos()

    }
}