const db = require('../config/db')
const bcrypt = require('bcrypt')

const tampilData = async (req,res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        await res.status(200).json({
            message: 'berhasil get data',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

const getById = async (req,res) => {
    try {
        const {id} = req.params;
        const query = 'SELECT * FROM users where id = ?'
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            message: 'berhasil get data users',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

const createData = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    if (!name || !password || !email || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'nama, password, email dan role wajib diisi'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)";
    await db.execute(query, [name, email, hashedPassword, role]);

    return res.status(201).json({
      status: 'success',
      message: 'registrasi anda berhasil'
    });

  } catch (error) {
    throw error;
  }
};

const updateData = async (req,res) => {
    try {
        const {id} = req.params;
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        if (!data.name || !data.email|| !data.password || !data.role) {
          return res.status(400).json({
          status: 'error',
          message: 'nama, password, email dan role wajib diisi'
        });
      }
 
        const query = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?'

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const [rows] = await db.execute(query, [data.name, data.email, hashedPassword, data.role, id])
        await res.status(200).json({
            message: 'berhasil update data',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

const deleteData = async (req,res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = ?';
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            message: 'berhasil delete data',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

module.exports = {
    tampilData,
    createData,
    updateData,
    deleteData,
    getById,
}