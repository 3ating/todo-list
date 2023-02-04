import React, { useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import Demo from "./DarkBtn";

function Theme({ dark, setDark, storedDark }) {
    const themeStyle = useMemo(() => {
        return {
            backgroundColor: dark ? "#2c3e50" : "#ADD8E6",
            color: dark ? "#ecf0f1" : "#234363",
        };
    }, [dark]);

    useEffect(() => {
        bodytheme();
    }, [themeStyle]);

    useEffect(() => {
        if (storedDark === "true") {
            setDark(true);
        } else if (storedDark === "false") {
            setDark(false);
        }
    }, []);

    useEffect(() => {
        Cookies.set("dark", dark);
    }, [dark]);

    const changeTheme = () => {
        setDark((prevDark) => !prevDark);
    };

    const bodytheme = () => {
        document.querySelector(".container").style.backgroundColor = themeStyle.backgroundColor;
        document.querySelector(".container").style.color = themeStyle.color;
    };

    return (
        <div id='button' onClick={changeTheme}>
            <Demo dark={dark} setDark={setDark} />
        </div>
    );
}

export default Theme;
