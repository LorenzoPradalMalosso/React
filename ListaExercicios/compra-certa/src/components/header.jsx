import '../App.css'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <img src={logo} alt="Logo -  Compra Fácil" />
                    <p>Compra Fácil</p>
                    <button type='button'>Comece a comprar já!</button>
                </nav>
            </header>
        </>
    )
}

export default Header