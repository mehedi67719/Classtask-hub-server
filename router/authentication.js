module.exports = (supabase) => {
    const router = require('express').Router()


    router.post('/register', async (req, res) => {
        const { name, email, password, role } = req.body;


        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })

            if (error) {
                return res.status(400).json({ error: error.message })
            }


            const user = data.user

            const { error: dbError } = await supabase
                .from('profile')
                .insert([
                    {
                        id: user.id,
                        name,
                        email,
                        role
                    }
                ])

            if (dbError) {
                return res.status(400).json({ error: dbError.message })
            }

            res.json({
                message: "Register success",
                user
            })



        }
        catch (err) {
            res.status(500).json({ error: err.message })
        }
    })



    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({
            user: data.user,
            session: data.session
        });
    });



    return router
}



