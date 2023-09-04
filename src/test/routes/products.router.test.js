import { expect } from "chai";
import supertest from "supertest";
import { dropProducts } from "../setup.test.js";

const requester = supertest ('http://localhost:4000')

describe ('test routes product', () =>{
    before ( async () =>{
        await dropProducts ()
    })

    it ('[POST] /api/product', async () => {
        const mockProduct = {
            title: "Jamon crudo",
            description: "Parma",
            code: "JC1",
            category: "fiambre",
            price: 3500,
            stock: 20,
            status: true,
            owner : "64d9a8c66c73832a4dbe7cb8",
            tumbnail: "https://drive.google.com/file/d/1W_CdrL-eT0El-CHmCasE1oNRtf3Xtp6Y/view?usp=drive_link"

        }

        const response = (await requester.post('/api/product').send(mockProduct));
        console.log(response.statusCode)

    })

    
})