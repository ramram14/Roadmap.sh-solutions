/**
 * Checks if the user is logged in. If they are, it calls next(), otherwise it redirects them to the login page.
 */

export const checkAuth = (req, res, next) => {
    if (req.cookies.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};
