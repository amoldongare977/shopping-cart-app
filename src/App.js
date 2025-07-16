import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, removeProduct, resetCart, selectBill } from './features/cartSlice'

function App() {
  const cart = useSelector(state => state.cart.cart)
  const products = useSelector(state => state.cart.products)
  const bill = useSelector(selectBill)
  const dispatch = useDispatch()

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {Object.keys(products).map(product => (
          <div key={product} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-medium">{product}</span> - £{products[product].toFixed(2)}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(removeProduct(product))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={cart[product] === 0}
              >
                -
              </button>
              <span className="w-6 text-center">{cart[product]}</span>
              <button
                onClick={() => dispatch(addProduct(product))}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Bill Summary</h2>
        <p><strong>Subtotal before offers:</strong> £{bill.subtotal}</p>
        <p className="mt-2 font-semibold">Special Offers Applied:</p>
        <ul className="list-disc list-inside ml-4">
          {parseFloat(bill.savings.cheese) > 0 && (
            <li>Cheese Offer Savings: -£{bill.savings.cheese}</li>
          )}
          {parseFloat(bill.savings.bread) > 0 && (
            <li>Bread Offer Savings (50% off): -£{bill.savings.bread}</li>
          )}
          {parseFloat(bill.savings.butter) > 0 && (
            <li>Butter Offer Savings (1/3 off): -£{bill.savings.butter}</li>
          )}
          {parseFloat(bill.savings.total) === 0 && (
            <li>No offers applied</li>
          )}
        </ul>
        <p className="mt-2 text-lg font-bold">Final Total: £{bill.finalTotal}</p>
      </div>

      <div className="mb-6 p-4 border rounded bg-yellow-50">
        <h2 className="text-xl font-semibold mb-2 text-yellow-800">Special Offers</h2>
        <ul className="list-disc list-inside text-sm text-yellow-700">
          <li><strong>Cheese:</strong> Buy 1, get 1 free</li>
          <li><strong>Soup:</strong> Buy 1 Soup and get:
            <ul className="list-disc ml-6">
              <li>Half-price Bread</li>
              <li>One-third off Butter</li>
            </ul>
          </li>
        </ul>
      </div>


      <button
        onClick={() => dispatch(resetCart())}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Reset Cart
      </button>
    </div>
  )
}

export default App
