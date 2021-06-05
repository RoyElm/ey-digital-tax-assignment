import React from "react";
import "./Footer.css";
import { Email, GitHub, LinkedIn } from "@material-ui/icons";

function Footer(): JSX.Element {


    return (
        <div className="Footer">
            <div className="site-data">
                <div className="about">
                    <p>
                        My name is Roy Elmakies Full Stack Developer,
                        Welcome to my digital Tax assignment.
                    </p>
                    <a href="https://www.linkedin.com/in/royelmakies/"><LinkedIn fontSize="large" /></a>
                    <a href="https://github.com/RoyElm"><GitHub fontSize="large" /></a>
                    <a href="mailto:roye456@gmail.com"><Email fontSize="large" /></a>
                </div>

                <div className="copyrights">
                    <p>
                        All rights reserved to Roy Elmakies &copy;{new Date().getFullYear()}
                    </p>
                </div>
            </div >
        </div>
    );
}

export default Footer;
