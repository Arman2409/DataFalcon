"use client"
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles/Login.module.scss";
import { getUserStatus } from "@/store/slices/loginSlice";

const getStatusTitle = (current: "signIn" | "signUp") => current === "signIn" ? "Sign In" : "Sign Up";

const Login = () => {
    const [status, setStatus] = useState<"signIn" | "signUp">("signIn");
    const form = useRef<any>(null);
    const dispatch = useDispatch();

    const submit = useCallback(() => {
        const {elements} = form.current;
        const userName = elements.username.value;
        const password = elements.password.value;
        if(status === "signUp") {
            const repeatPassword = elements.repeatPassword.value;
            if(password !== repeatPassword) {
                // ... 
                return;
            }
        }
        const data = dispatch(getUserStatus({userName, password}) as any).unwrap().then((data:any) => {
            console.log(data);
            
        })
        // .then(res => console.log(res))
        // .catch(err => console.log(err))
        console.log(data);
        
    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.window}>
                <h3 className={styles.title}>
                    {getStatusTitle(status)}
                </h3>
                <form 
                ref={form}
                className={styles.form} 
                onSubmit={submit}>
                    <input
                        type="name"
                        name="username"
                        placeholder="User Name"
                        className={styles.input} />
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        className={styles.input} />
                   {status === "signUp" && <input
                        placeholder="Repeat Password"
                        type="password"
                        name="repeatedPassword"
                        className={styles.input} />}
                        
                </form>
                <button onClick={submit}>
                {getStatusTitle(status)}
                </button>
                <p 
                className={styles.change_status_link} 
                onClick={() => setStatus(current => current === "signIn" ? "signUp" : "signIn")}
                >
                    {getStatusTitle(status === "signIn" ? "signUp" : "signIn")}
                </p>
            </div>
        </div>
    )
}

export default Login;