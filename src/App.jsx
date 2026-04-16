import './App.css';
import { useEffect, useState } from 'react';

function Rating({ value = 0 }) {
  return (
    <div className="flex gap-1">
      <div className="rounded-lg bg-yellow-500 w-3 h-3"></div>
      <div className="rounded-lg bg-yellow-500 w-3 h-3"></div>
      <div className="rounded-lg bg-yellow-500 w-3 h-3"></div>
      <div className="rounded-lg bg-yellow-500 w-3 h-3"></div>
      <div className="rounded-lg border-1 border-yellow-500 w-3 h-3"></div>
    </div>
  );
}

function ProductItem({ title, price }) {
  return (
    <div className="product-item flex flex-col border-1 hover:border-sky-500 rounded-lg m-2 p-2">
      <div className="relative image-wrap">
        <div className="bg-blue-400 w-full h-48"></div>
        <div className="reactions-wrap flex gap-1">
          <button className="border-1 border-white rounded-sm px-1">👁️</button>
          <button className="border-1 border-white rounded-sm px-1">❤️</button>
          <button className="border-1 border-white rounded-sm px-1">→</button>
        </div>
      </div>
      <div className="mt-2">{title}</div>
      <Rating value={1} />
      <div className="flex justify-between">
        <div className="mt-2">${price}</div>
        <button className="bg-sky-500 hover:bg-sky-600 px-3 rounded-lg text-white">
          + add
        </button>
      </div>
    </div>
  );
}

function ProductList({ productList = [] }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {productList.map((product) => {
        return <ProductItem title={product.title} price={product.price} />;
      })}
    </div>
  );
}

async function fetchProducts() {
  // const result = await fetch('https://jsonplaceholder.typicode.com/todos');
  // return result.json();
  const products = [
    {
      title: 'Product 1',
      price: 100,
    },
    {
      title: 'Product 2',
      price: 40,
    },
    {
      title: 'Product 3',
      price: 100,
    },
    {
      title: 'Product 4',
      price: 40,
    },

    {
      title: 'Product 5',
      price: 40,
    },
  ];
  return products;
}

function CartItem({ title, weight, price }) {
  return (
    <div className="flex items-center px-3 w-full gap-3 border-1 border-sky-500">
      <div className="bg-sky-300 w-16 h-16 "></div>
      <div className="flex w-full justify-between">
        <div className="">
          <p>{title}</p>
          <p className="font-thin text-xs">{weight}</p>
          <button className="text-xs">🗑️ Remove</button>
        </div>
        <div className="flex items-center">
          <p>${price}</p>
        </div>
      </div>
    </div>
  );
}

function Drawer({ isOpen, children }) {
  return (
    <div
      className={`${isOpen ? 'drawer-wrap-open' : ''
        } absolute drawer-wrap bg-white border-l-1 border-sky-500 w-100 min-h-screen`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const result = await fetchProducts();

      setProducts(result);
    }

    getProducts();
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-start px-4">
        <button
          onClick={() => {
            setIsCartOpen(!isCartOpen); // toggle
          }}
        >
          🛒
        </button>
      </div>
      <div>
        <ProductList productList={products} />

        <Drawer isOpen={isCartOpen}>
          <h2 className="heading">Mi Carrito</h2>
          <div className="flex flex-col gap-2 py-3">
            <CartItem title="Cart Item 1" weight=".78 lb" price={120} />
            <CartItem title="Cart Item 2" weight=".45 lb" price={20} />
            <CartItem title="Cart Item 3" weight="1 kb" price={340} />
          </div>
        </Drawer>
      </div>
    </div>
  );
}
