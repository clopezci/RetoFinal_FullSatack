import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../mockdata/users';

export const useStore = create(
    persist(
        (set, get) => ({
            // Productos
            products: [],
            setProducts: (products) => set({ products }),

            // Carrito
            cart: [],
            addToCart: (product) => set((state) => {
                const existingItem = state.cart.find(item => item.id === product.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map(item =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }),

            removeFromCart: (productId) => set((state) => ({
                cart: state.cart.filter(item => item.id !== productId)
            })),

            updateQuantity: (productId, quantity) => set((state) => ({
                cart: state.cart.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                ).filter(item => item.quantity > 0)
            })),

            clearCart: () => set({ cart: [] }),

            // Usuario
            user: null,
            setUser: (user) => set({ user }),
            users: mockUsers,
            login: (email, password) => {
                const state = get();
                const normalizedEmail = email.trim().toLowerCase();
                const account = state.users.find(
                    (candidate) =>
                        candidate.email.toLowerCase() === normalizedEmail
                        && candidate.password === password
                );

                if (!account) {
                    return false;
                }

                const safeUser = {
                    id: account.id,
                    name: account.name,
                    email: account.email,
                };
                set({ user: safeUser });
                return true;
            },
            registerUser: ({ name, email, password }) => {
                const state = get();
                const normalizedEmail = email.trim().toLowerCase();
                const alreadyExists = state.users.some(
                    (candidate) => candidate.email.toLowerCase() === normalizedEmail
                );

                if (alreadyExists) {
                    return false;
                }

                const newUser = {
                    id: state.users.length + 1,
                    name: name.trim(),
                    email: normalizedEmail,
                    password,
                };

                const safeUser = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                };

                set({
                    users: [...state.users, newUser],
                    user: safeUser,
                });

                return true;
            },
            logout: () => set({ user: null }),

            // Búsqueda
            searchTerm: '',
            setSearchTerm: (term) => set({ searchTerm: term }),

            // Paginación
            currentPage: 1,
            itemsPerPage: 12,
            setCurrentPage: (page) => set({ currentPage: page }),
        }),
        {
            name: 'eshop-storage',
            partialize: (state) => ({
                cart: state.cart,
                user: state.user,
                users: state.users,
            }),
        }
    )
);