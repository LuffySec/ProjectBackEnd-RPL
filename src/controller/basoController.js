const db = require('../config/db')

const tampilData = async (req,res,next) => {
    try {
        const query = 'SELECT * FROM products';
        const [rows] = await db.query(query);
        await res.status(200).json({
            message: 'berhasil get data',
            data: rows
        })
    } catch(error) {
        next(error)
    }
}

const getById = async (req,res,next) => {
    try {
        const {id} = req.params;
        const query = 'SELECT * FROM products where id = ?'
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            message: `berhasil get data ${id}`,
            data: rows
        })
    } catch(error) {
        next(error)
    }
}

const createData = async (req,res,next) => {
    try {
        const data = {
            nama: req.body.nama,
            harga: req.body.harga
        }
        if (!data.nama || !data.harga) {
          return res.status(400).json({
          status: 'error',
          message: 'nama dan harga belum diisi'
        });
      }
        const query = 'INSERT INTO products (nama, harga) VALUE (?,?)'
        const [rows] = await db.execute(query, [data.nama, data.harga])
        await res.status(200).json({
            message: 'berhasil simpan data di database',
            data: rows
        })
    } catch(error) {
        next(error)
    }
}

const updateData = async (req,res,next) => {
    try {
        const {id} = req.params;
        const data = {
            nama: req.body.nama,
            harga: req.body.harga
        }

        if (!data.nama || !data.harga) {
          return res.status(400).json({
          status: 'error',
          message: 'nama dan harga belum diisi'
        });
      }

      if (!data.harga) {
          return res.status(400).json({
          status: 'error',
          message: 'harga belum diisi'
        });
      }

        const query = 'UPDATE products SET nama = ?, harga = ? WHERE id = ?'
        const [rows] = await db.execute(query, [data.nama, data.harga, id])
        await res.status(200).json({
            message: 'berhasil update data',
            data: rows
        })
    } catch(error) {
        next(error)
    }
}

const deleteData = async (req,res,next) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM products WHERE id = ?';
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            message: 'berhasil delete data',
            data: rows
        })
    } catch(error) {
        next(error)
    }
}

module.exports = {
    tampilData,
    createData,
    updateData,
    deleteData,
    getById
}