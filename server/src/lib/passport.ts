import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '../models';
import { Role, User as UserType } from '../types';
import { JWT_SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY } from '../config';

passport.serializeUser((user: UserType, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        // save user to db if not exist
        if (!user) {
          user = await new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            imageURL: profile.photos[0].value,
          }).save();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    },
    async (token, done) => {
      try {
        const { user_id } = token;
        const user = await User.findById(user_id);
        if (!user) return done(null, false, 'User not found');
        //Pass the user details to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signUp',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { name } = req.body;

        let user = await User.findOne({ email });

        if (user)
          return done(null, false, { message: 'Email is already taken' });

        user = await User.create({
          email,
          password,
          name,
          role: Role.User,
          carts: [],
        });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const isPasswordMatch = await user.matchesPassword(password);

        if (!isPasswordMatch)
          return done(null, false, {
            message: 'Email or password is incorrect',
          });

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);
