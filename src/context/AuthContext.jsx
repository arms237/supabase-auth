import {
  createContext,
  useEffect,
  useState,
  useContext,
  Children,
} from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvier = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //sign up
  const signUpNewUser = async ({ email, password, username }) => {
    const { data, error } = await supabase.auth.signUp({
      options: {
        data: {
          username,
        },
      },
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }
    // Inserer le profil dans la table user 
    console.log("sign up success :", data);
    if (data?.user) {
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: data.user.id,
          username,
          avatar_url: "",
          role: "client",
        }
      ]);
      if(profileError){
        console.error("Error inserting profile: ", profileError);
      }
    }
    return { success: true, data };
  };

  // sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("Sign in error occured: ", error);
        return { success: false, error };
      }
      console.log("sign in succes :", data);
      return { success: true, data };
    } catch {
      console.error("An error occurred while signing in:", error);
      return { success: false, error };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
