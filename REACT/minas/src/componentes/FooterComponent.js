import React from 'react';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="contacto.html">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Dirección de mi aplicación Sudoku</h5>
                        <address>
                            Dirección completa<br />
                            de mi empresa sudoku<br />
                            ANDALUCÍA<br />
                            <i className="fa fa-phone fa-lg"></i>: +123456789<br />
                            <i className="fa fa-fax fa-lg"></i>: +123456789<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:jcmoreno@sintesis.com">
                                jcmoreno@sintesis.com</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a class="btn btn-block btn-social btn-twitter">
                                <span class="fa fa-twitter"></span>
                                Sign in with Twitter
                            </a>

                            <a class="btn btn-social-icon btn-twitter">
                                <span class="fa fa-twitter"></span>
                            </a>
                        </div>
                    </div>

                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2018 Sudoku company</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
