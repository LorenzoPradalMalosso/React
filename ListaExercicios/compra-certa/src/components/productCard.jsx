import '../App.css'

const ProductCard = ({ nome, preco, categoria, imagem }) => {
    return (
        <article className="product-card">
            <img className="product-card__image" src={imagem} alt={nome} />
            <div className="product-card__content">
                <span className="product-card__category">{categoria}</span>
                <h2>{nome}</h2>
                <strong>R$ {preco.toFixed(2).replace('.', ',')}</strong>
            </div>
        </article>
    )
}

export default ProductCard