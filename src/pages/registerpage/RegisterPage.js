import React from "react";
import RegistrationForm from "../../components/Register/Register";
import "./RegisterPage.module.css"
import styles from "./RegisterPage.module.css";

function RegisterPage() {
    return (
        <section className={styles['register-section']}>
            <article>
                <RegistrationForm/>
            </article>
        </section>

    )
}

export default RegisterPage