const Cube = require('../models/cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();

    return cubes
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean()

    return cube
}

const getCubeWithAccessories = async (id) => {
    const cube = await Cube.findById(id).populate('accessories').lean()

    return cube
}

const updateCube = async (cubeId, accessoryId) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    })
}

const deleteCube = async (id) => {
    const cube = await Cube.findByIdAndRemove(id)

    return cube
}

function index(req, res, next) {
    const { from, to, search } = req.query;

    let query = {};
    if (search) {
        query = {
            ...query, name: { $regex: new RegExp("^" + search.toLowerCase(), "i") }
        }
    }

    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } };
    }
    if (from) {
        query = { ...query, difficultyLevel: { ...query.difficultyLevel, $gte: +from } };
    }

    Cube.find(query).then(cubes => {
        res.render('index', {
            title: 'Cube Workshop',
            cubes,
            search,
            from,
            to
        });
    }).catch(next);
}

module.exports = {
    getAllCubes,
    getCube,
    updateCube,
    deleteCube,
    getCubeWithAccessories,
    index
}
