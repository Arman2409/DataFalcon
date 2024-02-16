"use client"
import { useCallback } from "react";
import axios from "axios";

import styles from "./styles/UrlInput.module.scss";

// const EXTRACT_QUERY = gql`
//     query Extract($url: String!, $open: JSON!) {
//         Extract(url: $url, open:$open) {
//             url
//         }
//     }
// `

const UrlInput = () => {
    // const [extract] = useLazyQuery(EXTRACT_QUERY);

    const extractData = useCallback(async (event: any) => {
        event.preventDefault();
        const url = event.target["0"].value;
        // const result = extract({
        //     variables: { url, open: [ 0 ] },
        //   }).then(data => console.log("Got data", data));
        const result = await axios.get("http://localhost:4000/extract",
            {
                params: { url }
            });
        console.log(result);
    }, [])

    return (
        <div className={styles.url_input_main}>
            <form onSubmit={extractData}>
                <input
                    name="url"
                    type="url"
                    className={styles.url_input}
                />
                <button
                    type="submit"
                    className={styles.submit_button}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UrlInput;