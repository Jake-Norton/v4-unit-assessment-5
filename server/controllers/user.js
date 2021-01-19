const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const {profile_pic} = `https://robohash.org/${username}.png`;
        const db = req.app.get('db');
        const result = await db.find_user_by_username([username]);
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username already exists, please pick something different.');
        }
        const registeredUser = await db.register_user([username, password, profile_pic]);
        const user = registeredUser[0];
        req.session.user = {username: user.username, password: user.password, profile_pic: user.profile_pic};
        return res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        const foundUser = await req.app.get('db').find_user_by_username([username]);
        const user = foundUser[0];
        if (!user) {
            return res.status(401).send('Username not registered. Please register or check your spelling.');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password.')
        }
        req.session.user = {username: user.username, password: user.password, profile_pic: user.profile_pic};
        return res.send(req.session.user);
    },

    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },

    getUser: async (req, res) => {
        const user = req.session.user();
        if (!user) {
            return res.status(404)
        }
        return res.send(req.session.user);
    }
}