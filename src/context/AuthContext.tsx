import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/firebase";


type AuthContextType = {

    currentUser : User | null;
    loading : boolean;
    signUp: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>

}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}){

const [ currentUser, setCurrentUser] = useState<User | null>(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user)=> {
    setCurrentUser(user);
    setLoading(false)

   });

   return unsubscribe
}, [])

async function signUp(email: string, password: string): Promise<void>{
    await createUserWithEmailAndPassword(auth, email, password);
}

async function login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
}

function logout(): Promise<void> {
    return signOut(auth);
}


const value: AuthContextType = {
    currentUser,
    loading,
    signUp,
    login,
    logout,
};

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}




