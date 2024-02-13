"use client"
import { useCallback } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import styles from "./styles/UrlInput.module.scss";

const EXTRACT_QUERY = gql`
    query Extract($url: String!) {
        Extract(url: $url) {
        # Specify the data you want to extract from the website
        data
        url
        # ... other desired fields
        }
    }
`

const UrlInput = () => {
    const [extract] = useLazyQuery(EXTRACT_QUERY);

    const extractData = useCallback((event: any) => {
        event.preventDefault();
        const url = event.target["0"].value;
        const result = extract({
            variables: { url },
          }).then(data => console.log("Got data", data));
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