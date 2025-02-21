const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index"); // Ensure this points to your server entry file
const { expect } = chai;

chai.use(chaiHttp);

describe("Doctor API Tests", () => {
    let doctorId = "";

    // ✅ Test Adding a New Doctor
    it("should add a new doctor", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app)
                .post("/doctors/save")
                .send({
                    name: "Dr. Joh Doe",
                    specialization: "Cardiologist",
                    contact: "1234567800",
                    email: "johne@example.com"
                });

            console.log("Doctor Created Response:", res.body); // Debug log

            expect(res).to.have.status(201);
            expect(res.body).to.have.property("message", "Doctor created successfully");
            doctorId = res.body.newDoctor._id;
        } catch (error) {
            console.error("Doctor Creation Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Fetching All Doctors
    it("should fetch all doctors", async function () {
        this.timeout(5000);
        try {
            const res = await chai.request(app).get("/doctors/getAll");
            console.log("Fetched Doctors:", res.body); // Debug log

            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
        } catch (error) {
            console.error("Error Fetching Doctors:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Fetching Doctor by ID
    it("should fetch a doctor by ID", async function () {
        this.timeout(5000);
        if (!doctorId) throw new Error("Doctor ID not set");

        try {
            const res = await chai.request(app).get(`/doctors/${doctorId}`);
            console.log("Fetched Doctor by ID:", res.body); // Debug log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("_id", doctorId);
        } catch (error) {
            console.error("Error Fetching Doctor by ID:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Updating a Doctor
    it("should update a doctor", async function () {
        this.timeout(5000);
        if (!doctorId) throw new Error("Doctor ID not set");

        try {
            const res = await chai.request(app)
                .put(`/doctors/${doctorId}`)
                .send({ contact: "9876543010" });

            console.log("Doctor Update Response:", res.body); // Debug log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "Doctor updated successfully");
        } catch (error) {
            console.error("Doctor Update Error:", error.response ? error.response.body : error);
            throw error;
        }
    });

    // ✅ Test Deleting a Doctor
    it("should delete a doctor", async function () {
        this.timeout(5000);
        if (!doctorId) throw new Error("Doctor ID not set");

        try {
            const res = await chai.request(app).delete(`/doctors/${doctorId}`);
            console.log("Doctor Delete Response:", res.body); // Debug log

            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message", "Doctor deleted successfully");
        } catch (error) {
            console.error("Doctor Delete Error:", error.response ? error.response.body : error);
            throw error;
        }
    });
});
