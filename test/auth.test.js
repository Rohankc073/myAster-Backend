const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Your server file
const { expect } = chai;

chai.use(chaiHttp);

describe("User API Tests", () => {
    let userToken = ""; // Store JWT Token
    let userId = ""; // Store User ID

    // ✅ Test User Registration
    it("should register a new user", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .post("/auth/register")
                .send({
                    name: "Test User",
                    email: "testuser1234@example.com",
                    password: "password123",
                    phone: "9876543211",
                    role: "Admin"
                });

            console.log("User Registration Response:", res.body); // Debug Log

            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message", "User registered successfully");
            userId = res.body.user.id;
        } catch (error) {
            console.error("User Registration Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test User Login
    it("should login the user and return a JWT token", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .post("/auth/login")
                .send({
                    email: "testuser1234@example.com",
                    password: "password123"
                });

            console.log("User Login Response:", res.body); // Debug Log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("token");
            userToken = res.body.token; // Store JWT Token for further tests
        } catch (error) {
            console.error("User Login Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Fetching User Profile (Protected Route)
    it("should fetch the user profile using JWT Token", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .get(`/user/${userId}`)
                .set("Authorization", `Bearer ${userToken}`);

            console.log("User Profile Response:", res.body); // Debug Log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("_id", userId);
        } catch (error) {
            console.error("User Profile Fetch Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Updating User Profile
    it("should update the user profile", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .put(`/user/update/${userId}`)
                .set("Authorization", `Bearer ${userToken}`)
                .send({ phone: "9998887776" });

            console.log("User Update Response:", res.body); // Debug Log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "Patient updated successfully");
        } catch (error) {
            console.error("User Update Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Deleting a User
    it("should delete the user account", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .delete(`/user/${userId}`)
                .set("Authorization", `Bearer ${userToken}`);

            console.log("User Delete Response:", res.body); // Debug Log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "Patient deleted successfully");
        } catch (error) {
            console.error("User Delete Error:", error.response ? error.response.body : error);
            throw error;
        }
    });
});
