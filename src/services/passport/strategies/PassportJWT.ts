import passportJWT from 'passport-jwt';
import passport from 'passport';
import { UserModel, UserDoc } from '@App/interfaces/models/user';
import { UserDTO } from '@App/services/tokenService/tokenService';
const JwtStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('jwt-strategy',new JwtStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'll'
},  async(jwtToken, done) => {
    const user =await UserModel.findOne({ _id: jwtToken._id });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }

}))

export default passport;