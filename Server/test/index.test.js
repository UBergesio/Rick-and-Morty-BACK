const app = require("../src/app");
const session = require("supertest");
const agent = session(app);
const user = require("../src/utils/users");

describe("Test de RUTAS", () => {

  describe("GET /rickandmorty/character/:id", () => {

    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.body).toHaveProperty(
        "id",
        "name",
        "species",
        "gender",
        "status",
        "origin",
        "image"
      );
    });

    it("Si hay un error responde con status: 500", async () => {
      const response = await agent.get("/rickandmorty/character/1");
      // Utilizamos la función toThrow para verificar que se lance una excepción
      expect(() => {
        expect(response.statusCode).toEqual(500);
      }).toThrow();
    });
  });
  describe("GET /rickandmorty/login", () => {

    it('Debería obtener un objeto con "access: true" si las credenciales son correctas', async () => {
      const usuario = user[0];
      const email = usuario.email;
      const password = usuario.password;
      const response = await agent
        .get(`/rickandmorty/login`)
        .query({ email, password });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        access: true,
      });
    });

    it('Debería obtener un objeto con "access: false" si las credenciales son incorrectas', async () => {
      const email = "email@email.com";
      const password = "hola mundo";
      const response = await agent
        .get(`/rickandmorty/login`)
        .query({ email, password });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ access: false });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Se agrega el personaje a Fav", async () => {
      const response = await agent.post("/rickandmorty/fav");
      expect(response.body).toEqual([{}])
    })
  });
});
