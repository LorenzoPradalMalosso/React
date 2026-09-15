import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/productCard.jsx'

const Produtos = [
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
  {
    nome: 'Placa de vídeo Geforce RTX 5060',
    preco: 3199.99,
    categoria: 'Tecnologia',
    imagem: 'https://cdn.dooca.store/151246/products/kftcm70rd7b0lnuh9djbtw5rzexvsbgd9hk4_495x495+fill_ffffff+crop_center.jpg?v=1770238731000&webp=0',
  },
]

function App() {
  
  return (
    <>

      <Header />
      <div>
        <h1>Compra Certa</h1>
        <p>Aqui, você encontra produtos variados de diversas categorias, incluindo Tecnologia, Games, Papelaria...</p>
      </div>

      <main className="products-grid">
        {Produtos.map((produto) => (
          <ProductCard key={produto.nome} {...produto} />
        ))}
      </main>

    </>
  )
}

export default App
