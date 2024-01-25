"use client"
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles/Login.module.scss";
import { getUser } from "@/store/slices/loginSlice";

const getStatusTitle = (current: "signIn" | "signUp") => current === "signIn" ? "Sign In" : "Sign Up";

const Login = () => {
    const [status, setStatus] = useState<"signIn" | "signUp">("signIn");
    const form = useRef<any>(null);
    const dispatch = useDispatch();

    const submit = useCallback(async () => {
        const {elements} = form.current;
        const username = elements.username.value;
        const password = elements.password.value;
        if(status === "signUp") {
            const repeatPassword = elements.repeatPassword.value;
            if(password !== repeatPassword) {
                // ... 
                return;
            }
        }
        await dispatch(getUser({username, password}) as any).unwrap().then((data:any) => {
            if(typeof data === "object") {

            }
            if(typeof data === "object") {

            }
        }).catch(({message}:Error) => {
           console.error(message);
        })
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