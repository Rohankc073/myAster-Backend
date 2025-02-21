// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../index"); // Ensure this points to your server entry file
// const { expect } = chai;

// chai.use(chaiHttp);

// describe("Authentication API Tests", () => {
//     let userToken = "";
//     let adminToken = "";
//     let userId = "";

//     // ✅ Generate a unique email for each test run
//     const testEmail = `testuser${Date.now()}@example.com`;

//     // ✅ Test User Registration
//     it("should register a new user", async function () {
//         this.timeout(10000); // Increased timeout to 10 seconds

//         try {
//             const res = await chai.request(app)
//                 .post("/auth/register")
//                 .send({
//                     name: "Test User",
//                     email: testEmail, // Unique email to avoid conflicts
//                     password: "Test@123",
//                     phone: "9876033010",
//                     role: "Patient"
//                 });

//             console.log("Registration Response:", res.body); // Debugging Log

//             expect(res).to.have.status(201);
//             expect(res.body).to.have.property("success", true);
//             expect(res.body).to.have.property("token");
//             expect(res.body).to.have.property("user");

//             userToken = res.body.token;
//             userId = res.body.user._id;

//             if (!userId) throw new Error("User ID not returned in registration response");
//         } catch (error) {
//             throw error;
//         }
//     });

//     // ✅ Test Admin Login
//     it("should log in an admin user", async function () {
//         this.timeout(10000);
//         try {
//             const res = await chai.request(app)
//                 .post("/auth/login")
//                 .send({
//                     email: "admin@gmail.com", // Ensure this admin exists in DB
//                     password: "admin123"
//                 });

//             console.log("Admin Login Response:", res.body); // Debugging Log

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property("token");

//             adminToken = res.body.token;
//         } catch (error) {
//             throw error;
//         }
//     });

//     // ✅ Test Fetching All Users (Admin Only)
//     it("should fetch all users (Admin Only)", async function () {
//         this.timeout(10000);
//         try {
//             const res = await chai.request(app)
//                 .get("/user/all")
//                 .set("Authorization", `Bearer ${adminToken}`);

//             console.log("Fetch Users Response:", res.body); // Debugging Log

//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an("array");
//         } catch (error) {
//             throw error;
//         }
//     });

//     // ✅ Test Fetching a User by ID
//     it("should fetch a user by ID", async function () {
//         this.timeout(10000);
//         if (!userId) throw new Error("User ID not set - Registration might have failed");

//         try {
//             const res = await chai.request(app)
//                 .get(`/user/${userId}`)
//                 .set("Authorization", `Bearer ${userToken}`);

//             console.log("Fetch User Response:", res.body); // Debugging Log

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property("_id", userId);
//         } catch (error) {
//             throw error;
//         }
//     });

//     // ✅ Test Updating a User
//     it("should update a user", async function () {
//         this.timeout(10000);
//         if (!userId) throw new Error("User ID not set - Registration might have failed");

//         try {
//             const res = await chai.request(app)
//                 .put(`/user/${userId}`)
//                 .set("Authorization", `Bearer ${userToken}`)
//                 .send({
//                     name: "Updated Test User"
//                 });

//             console.log("Update User Response:", res.body); // Debugging Log

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property("success", true);
//         } catch (error) {
//             throw error;
//         }
//     });

//     // ✅ Test Deleting a User (Admin Only)
//     it("should delete a user (Admin Only)", async function () {
//         this.timeout(10000);
//         if (!userId) throw new Error("User ID not set - Registration might have failed");

//         try {
//             const res = await chai.request(app)
//                 .delete(`/user/${userId}`)
//                 .set("Authorization", `Bearer ${adminToken}`);

//             console.log("Delete User Response:", res.body); // Debugging Log

//             expect(res).to.have.status(200);
//             expect(res.body).to.have.property("success", true);
//         } catch (error) {
//             throw error;
//         }
//     });
// });
