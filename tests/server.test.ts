import { InventoryItem } from "../models/Inventory";
import app from "../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { expect } = chai;
const baseUrl = "/api/inventory";

describe("Inventory Tests", () => {
  const data: InventoryItem = {
    productName: "Paracetamol",
    price: 20,
    totalQuantity: 50,
    tax: false,
    taxPercentage: 2,
    lowStockCount: 10,
    isOutOfStock: false,
  };

  it("Fetching Items --- GET /api/inventory", () => {
    chai
      .request(app)
      .get(`/api/inventory`)
      .end((err, res) => {
        const result = res.body;
        expect(res).to.have.status(200);
        expect(result).to.be.an("array");
        expect(result.length).to.be.greaterThan(0);
      });
  });

  it("Adding Item --- POST /api/inventory", (done) => {
    chai
      .request(app)
      .post("/api/inventory")
      .send(data)
      .end((err, res) => {
        const result = res.body;
        expect(res).to.have.status(201);
        expect(result.price).to.eql(data.price);
        expect(result.productName).to.eql(data.productName);
        done();
      });
  });

  it("Fetching Single Item ---  GET /api/inventory/:id", (done) => {
    chai
      .request(app)
      .post("/api/inventory")
      .send(data)
      .end((err, res) => {
        chai
          .request(app)
          .get(`/api/inventory/` + res.body.id)
          .end((err2, res2) => {
            const result = res.body;
            expect(res2).to.have.status(200);
            expect(result).to.be.an("object");
            expect(result.price).to.eql(data.price);
            expect(result.productName).to.eql(data.productName);
            done();
          });
        done();
      });
  });

  it("Delete an Item  ---  DELETE /api/inventory/delete:id", (done) => {
    chai
      .request(app)
      .post("/api/inventory")
      .send(data)
      .end((err, res) => {
        chai
          .request(app)
          .delete(`/api/inventory/` + res.body.id)
          .end((err2, res2) => {
            expect(res2).to.have.status(200);
            done();
          });
        done();
      });
  });

  it("Updating an Item  ---  PUT /api/inventory/:id", () => {
    const newItem = {
      productName: "Buscopan",
      price: 80,
      totalQuantity: 20,
      tax: true,
      taxPercentage: 20,
      lowStockCount: 12,
      isOutOfStock: true,
    };

    return chai
      .request(app)
      .post("/api/inventory")
      .send(data)
      .then((res) => {
        return chai
          .request(app)
          .put(`/api/inventory/` + res.body.id)
          .send(newItem);
      })
      .then((res) => {
        const result = res.body;
        expect(res).to.have.status(200);
        expect(result.price).to.eql(newItem.price);
        expect(result.productName).to.eql(newItem.productName);
        return;
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Erase all Items  ---  DELETE /api/inventory", () => {
    return chai
      .request(app)
      .delete("/api/inventory")
      .send(data)
      .then(() => {
        return chai.request(app).get(`/api/inventory`);
      })
      .then((res) => {
        const result = res.body;
        expect(res).to.have.status(200);
        expect(result).to.be.an("array");
        expect(result).to.be.empty;
        return;
      })
      .catch((err) => {
        throw err;
      });
  });

  it("Special Case inventory Item  ---  GET /api/special", () => {
    const newItem = {
      productName: "Buscopan",
      price: 97,
      totalQuantity: 20,
      tax: true,
      taxPercentage: 20,
      lowStockCount: 12,
      isOutOfStock: true,
    };
    const extraItem = {
      productName: "Amoxil",
      price: 80,
      totalQuantity: 20,
      tax: true,
      taxPercentage: 20,
      lowStockCount: 12,
      isOutOfStock: true,
    };

    return chai
      .request(app)
      .post("/api/inventory")
      .send(data)
      .then((res) => {
        return chai.request(app).post(`/api/inventory`).send(newItem);
      })
      .then((res2) => {
        return chai.request(app).post(`/api/inventory`).send(extraItem);
      })
      .then((res3) => {
        return chai.request(app).get(`/api/special`);
      })
      .then((res4) => {
        const result = res4.body;
        expect(res4).to.have.status(200);
        expect(result).to.be.an("array");
        expect(result.length).to.eql(2);
        expect(result[0]).to.eql(data.productName);
        expect(result[1]).to.eql(extraItem.productName);
        return;
      })
      .catch((err) => {
        throw err;
      });
  });
});
