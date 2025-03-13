const db = require('./database');

exports.getUsers = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        let query = `SELECT SQL_CALC_FOUND_ROWS id, username, role FROM usuarios`;
        let params = [];

        if (search) {
            query += ` WHERE username LIKE ? OR role LIKE ?`;
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [rows] = await db.promise().query(query, params);
        const [[{ total }]] = await db.promise().query(`SELECT FOUND_ROWS() AS total`);

        res.json({
            data: rows,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};
