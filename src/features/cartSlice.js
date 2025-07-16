import { createSlice } from '@reduxjs/toolkit'

const products = {
    Bread: 1.10,
    Milk: 0.50,
    Cheese: 0.90,
    Soup: 0.60,
    Butter: 1.20,
}

const initialState = {
    products,
    cart: {
        Bread: 0,
        Milk: 0,
        Cheese: 0,
        Soup: 0,
        Butter: 0,
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state, action) {
            const product = action.payload
            if (state.cart[product] !== undefined) {
                state.cart[product]++
            }
        },
        removeProduct(state, action) {
            const product = action.payload
            if (state.cart[product] > 0) {
                state.cart[product]--
            }
        },
        resetCart(state) {
            Object.keys(state.cart).forEach(p => state.cart[p] = 0)
        }
    },
})

export const { addProduct, removeProduct, resetCart } = cartSlice.actions

// Selector to calculate bill with offers and savings
export const selectBill = (state) => {
    const cart = state.cart.cart
    const prices = state.cart.products

    // Calculate subtotal (without offers)
    let subtotal = 0
    for (const product in cart) {
        subtotal += cart[product] * prices[product]
    }

    // Apply special offers
    // 1) Buy Cheese get Cheese free (2 for 1)
    const cheeseCount = cart.Cheese
    const freeCheeseCount = Math.floor(cheeseCount / 2)
    const cheeseSavings = freeCheeseCount * prices.Cheese

    // 2) Buy Soup get Bread half price & Butter third off
    const soupCount = cart.Soup
    const breadCount = cart.Bread
    const butterCount = cart.Butter

    // Bread half price on number of soups (max bread count)
    const breadDiscountCount = Math.min(soupCount, breadCount)
    const breadSavings = breadDiscountCount * (prices.Bread / 2)

    // Butter 1/3 off on number of soups (max butter count)
    const butterDiscountCount = Math.min(soupCount, butterCount)
    const butterSavings = butterDiscountCount * (prices.Butter / 3)

    const totalSavings = cheeseSavings + breadSavings + butterSavings
    const finalTotal = subtotal - totalSavings

    return {
        subtotal: subtotal.toFixed(2),
        savings: {
            cheese: cheeseSavings.toFixed(2),
            bread: breadSavings.toFixed(2),
            butter: butterSavings.toFixed(2),
            total: totalSavings.toFixed(2),
        },
        finalTotal: finalTotal.toFixed(2),
    }
}

export default cartSlice.reducer
