import React from 'react';
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className="welcome-page">
            <header className="welcome-header">
                <ul>
                    <li><Link className="link" to="/">O aplikaciji</Link></li>
                    <li><Link className="link" to="/">FAQ</Link></li>
                    <li><Link className="link" to="/login">Login</Link></li>
                    <li><Link className="link" to="/register">Register</Link></li>
                </ul>
            </header>
            <main className="welcome-main">
                <div className="main-content">
                    <header>
                        Narucite knjige!
                    </header>
                    <main>
                        <p>Dobrodošli u našu online knjižaru!</p>
                        <p>Pristupite našoj širokoj ponudi knjiga iz svih žanrova – od najnovijih bestselera do
                            klasičnih djela. Bilo da ste ljubitelj fikcije, povijesti, znanstvene fantastike ili
                            edukativnih knjiga, imamo nešto za svakoga.</p>
                        <p>Za jednostavnu i brzu kupovinu, samo odaberite knjige koje vas zanimaju, dodajte ih u svoju
                            košaricu, i obavite narudžbu na nekoliko klikova. Dostava je brza, a naš korisnički servis
                            je uvijek tu za vas.</p>
                        <p>Pratite nas na društvenim mrežama kako biste bili u tijeku s najnovijim promocijama i
                            novostima iz svijeta knjiga!</p>
                    </main>
                </div>

                <div className="main-content">
                    <header>
                        Narucite knjige!
                    </header>
                    <main>
                        <p>Dobrodošli u našu online knjižaru!</p>
                        <p>Pristupite našoj širokoj ponudi knjiga iz svih žanrova – od najnovijih bestselera do
                            klasičnih djela. Bilo da ste ljubitelj fikcije, povijesti, znanstvene fantastike ili
                            edukativnih knjiga, imamo nešto za svakoga.</p>
                        <p>Za jednostavnu i brzu kupovinu, samo odaberite knjige koje vas zanimaju, dodajte ih u svoju
                            košaricu, i obavite narudžbu na nekoliko klikova. Dostava je brza, a naš korisnički servis
                            je uvijek tu za vas.</p>
                    </main>
                </div>

                <div className="main-content">
                    <header>
                        Narucite knjige!
                    </header>
                    <main>
                        <p>Dobrodošli u našu online knjižaru!</p>
                        <p>Pristupite našoj širokoj ponudi knjiga iz svih žanrova – od najnovijih bestselera do
                            klasičnih djela. Bilo da ste ljubitelj fikcije, povijesti, znanstvene fantastike ili
                            edukativnih knjiga, imamo nešto za svakoga.</p>
                        <p>Za jednostavnu i brzu kupovinu, samo odaberite knjige koje vas zanimaju, dodajte ih u svoju
                            košaricu, i obavite narudžbu na nekoliko klikova. Dostava je brza, a naš korisnički servis
                            je uvijek tu za vas.</p>
                    </main>
                </div>
            </main>
            <footer className="welcome-footer">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Welcome;
