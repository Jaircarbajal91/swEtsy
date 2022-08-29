
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <nav className='bottom-nav-container'>
            <div className='bottom-header'>
                <div className='bottom-header-content'>
                <span className='bottom-header-emoji'>🔌⚡️   </span>
                <span className='bottom-header-text'>swEtsy is powered by 100% sweat.</span>
                </div>
            </div>
            <div className='bottom-links'>
                <div className='bottom-links-contributors'>
                    <p className='bottom-contributors-p'>Contributors</p>
                    <ul className='bottom-contributors-ul'>
                        <li>
                            <a href='https://github.com/alice886' target="_blank" rel="noopener noreferrer">
                                Alice L.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/khz538' target="_blank" rel="noopener noreferrer">
                                Kevin Z.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91' target="_blank" rel="noopener noreferrer">
                                Jair C.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/zerotume' target="_blank" rel="noopener noreferrer">
                                Heng W.
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-wikis'>
                    <p className='bottom-wikis-p'>Project Github & Wiki</p>
                    <ul className='bottom-wikis-ul'>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy' target="_blank" rel="noopener noreferrer">
                                Github Mainpage
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/DB-Schema' target="_blank" rel="noopener noreferrer">
                                DB Schema
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Feature-List' target="_blank" rel="noopener noreferrer">
                                Feature List
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/User-Stories' target="_blank" rel="noopener noreferrer">
                                User Stories
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Backend-API-Routes' target="_blank" rel="noopener noreferrer">
                                Backend API Routes
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Frontend-Routes' target="_blank" rel="noopener noreferrer">
                                Front End Routes
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-tools'>
                    <p className='bottom-tools-p'>Tools Used</p>
                    <ul className='bottom-tools-ul'>
                        <li>
                            <a href='https://www.python.org/' target="_blank" rel="noopener noreferrer">
                                Python
                            </a>
                        </li>
                        <li>
                            <a href='https://flask.palletsprojects.com/en/2.2.x/' target="_blank" rel="noopener noreferrer">
                                Flask
                            </a>
                        </li>
                        <li>
                            <a href='https://www.sqlalchemy.org/' target="_blank" rel="noopener noreferrer">
                                SQLAlchemy
                            </a>
                        </li>
                        <li>
                            <a href='https://www.sqlite.org/index.html' target="_blank" rel="noopener noreferrer">
                                SQLite
                            </a>
                        </li>
                        <li>
                            <a href='https://www.javascript.com/' target="_blank" rel="noopener noreferrer">
                                JavaScript
                            </a>
                        </li>
                        <li>
                            <a href='https://nodejs.org/en/' target="_blank" rel="noopener noreferrer">
                                Node.js®
                            </a>
                        </li>
                        <li>
                            <a href='https://reactjs.org/' target="_blank" rel="noopener noreferrer">
                                React
                            </a>
                        </li>
                        <li>
                            <a href='https://redux.js.org/' target="_blank" rel="noopener noreferrer">
                                Redux
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-thank'>
                    <p className='bottom-thank-p'>Thanks to</p>
                    <ul className='bottom-thank-ul'>
                        <li>
                            <a href='https://www.heroku.com' target="_blank" rel="noopener noreferrer">
                                Heroku
                            </a>
                        </li>
                        <li>
                            <a href='https://www.docker.com/' target="_blank" rel="noopener noreferrer">
                                Docker
                            </a>
                        </li>
                        <li>
                            <a href='https://www.postgresql.org/' target="_blank" rel="noopener noreferrer">
                                PostgreSQL
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='bottom-footer'>
                <div className='bottom-footer-left'>
                    <span className='bottom-footer-left-pre'>Instructed By </span>
                    <span className='bottom-footer-left-after'>a/A - App Academy</span>
                </div>
                <div className='bottom-footer-right'>
                    <span className='bottom-footer-right-info'>@ 2022 swEtsy</span>
                    <span className='bottom-footer-right-info'><a href='https://www.appacademy.io/' target="_blank" rel="noopener noreferrer">
                        Interested in a/A?
                    </a></span>
                    <span className='bottom-footer-right-info'><a href='https://www.appacademy.io/enterprise/hiring' target="_blank" rel="noopener noreferrer">
                        Hire a/A grads?
                    </a></span>
                </div>
            </div>

        </nav>
    );
}

export default BottomNav;
