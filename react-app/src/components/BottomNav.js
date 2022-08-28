
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
                            <a href='https://github.com/alice886' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Alice L.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/khz538' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Kevin Z.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Jair C.
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/zerotume' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Heng W.
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-wikis'>
                    <p className='bottom-wikis-p'>Project Github & Wiki</p>
                    <ul className='bottom-wikis-ul'>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Github Mainpage
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/DB-Schema' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                DB Schema
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Feature-List' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Feature List
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/User-Stories' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                User Stories
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Backend-API-Routes' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Backend API Routes
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/Jaircarbajal91/swEtsy/wiki/Frontend-Routes' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Front End Routes
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-tools'>
                    <p className='bottom-tools-p'>Tools Used</p>
                    <ul className='bottom-tools-ul'>
                        <li>
                            <a href='https://www.python.org/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Python
                            </a>
                        </li>
                        <li>
                            <a href='https://flask.palletsprojects.com/en/2.2.x/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Flask
                            </a>
                        </li>
                        <li>
                            <a href='https://www.sqlalchemy.org/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                SQLAlchemy
                            </a>
                        </li>
                        <li>
                            <a href='https://www.sqlite.org/index.html' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                SQLite
                            </a>
                        </li>
                        <li>
                            <a href='https://www.javascript.com/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                JavaScript
                            </a>
                        </li>
                        <li>
                            <a href='https://nodejs.org/en/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Node.js®
                            </a>
                        </li>
                        <li>
                            <a href='https://reactjs.org/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                React
                            </a>
                        </li>
                        <li>
                            <a href='https://redux.js.org/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Redux
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='bottom-links-thank'>
                    <p className='bottom-thank-p'>Thanks to</p>
                    <ul className='bottom-thank-ul'>
                        <li>
                            <a href='https://www.heroku.com' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Heroku
                            </a>
                        </li>
                        <li>
                            <a href='https://www.docker.com/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                                Docker
                            </a>
                        </li>
                        <li>
                            <a href='https://www.postgresql.org/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
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
                    <span className='bottom-footer-right-info'><a href='https://www.appacademy.io/' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                        Interested in a/A?
                    </a></span>
                    <span className='bottom-footer-right-info'><a href='https://www.appacademy.io/enterprise/hiring' target="_blank" rel="noopener noreferrer" activeClassName='active'>
                        Hire a/A grads?
                    </a></span>
                </div>
            </div>

        </nav>
    );
}

export default BottomNav;
