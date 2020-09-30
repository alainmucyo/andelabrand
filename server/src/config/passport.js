import passportJwt from "passport-jwt"

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
export const jwtStrategy = new JwtStrategy(options, (payload, done) => {
    return done(null, {id: payload.userId})
})