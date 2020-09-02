import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models";
import { Role } from "../types";
import { JWT_SECRET_KEY } from "../config";

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { user_id } = token;
        const user = await User.findById(user_id);
        if (!user) return done(null, false, "User not found");
        //Pass the user details to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signUp",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const { name } = req.body;

        let user = await User.findOne({ email: email.toLowerCase() });

        if (user)
          return done(null, false, { message: "Email is already taken" });

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
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "Email or Password is incorrect",
          });
        }

        const isPasswordMatch = await user.matchesPassword(password);

        if (!isPasswordMatch)
          return done(null, false, {
            message: "Email or password is incorrect",
          });

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
