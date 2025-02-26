const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Ensure this points to your server entry file
const { expect } = chai;

chai.use(chaiHttp);

describe("Backend API Tests", () => {
    let productId = "";
    let doctorId = "";

    /**
     * ✅ Test Product API
     */
    describe("Product API Tests", () => {
        it("should add a new product", async function () {
            this.timeout(5000);
            const res = await chai.request(app)
                .post("/products/add")
                .send({
                    name: "Test Medicine",
                    genericName: "Paracetamol",
                    manufacturer: "MediCorp",
                    price: 50,
                    quantity: 100,
                    dosage: "500mg",
                    requiresPrescription: false,
                    category: "Pain Relief",
                    description: "Effective pain reliever"
                });

            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message", "✅ Product added successfully");
            productId = res.body.product._id;
        });

        it("should fetch all products", async function () {
            this.timeout(5000);
            const res = await chai.request(app).get("/products/all");
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        });

        it("should fetch a product by ID", async function () {
            this.timeout(5000);
            const res = await chai.request(app).get(`/products/${productId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("_id", productId);
        });

        it("should update a product", async function () {
            this.timeout(5000);
            const res = await chai.request(app)
                .put(`/products/update/${productId}`)
                .send({ price: 60 });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "✅ Product updated successfully");
        });

        it("should delete a product", async function () {
            this.timeout(5000);
            const res = await chai.request(app).delete(`/products/delete/${productId}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "✅ Product deleted successfully");
        });
    });
    });
