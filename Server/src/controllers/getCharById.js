const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";
//Hola
const getCharById = async (req, res) => {
  /*  const { id } = req.params; */
  const id = parseInt(req.params.id);
/*   axios(`${URL}${id}`)
    .then(({ data }) => {
      const objChar = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin,
        image: data.image,
        status: data.status,
      };
      if (objChar.name) {
        res.status(200).json(objChar);
      } else {
        res.status(404).send("Not fount");
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
  
  
   */
    try {
      const response = await axios(`${URL}${id}`)
      const { data } = response
      const objChar = {
        id: data.id,
        name: data.name,
        gender: data.gender,
        species: data.species,
        origin: data.origin,
        image: data.image,
        status: data.status,
      };
      if (objChar.name) {
        res.status(200).json(objChar);
      } else {
        res.status(404).send("Not fount");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


module.exports = getCharById;
