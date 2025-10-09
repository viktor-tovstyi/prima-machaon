<template>
    <div id="app">
        <NavBar>
            <template #start>
                <img height="50" src="assets/logo.png" /><h1>MachaOn-SL-OCI-1 Storefront</h1>
            </template>
            <template #end>
                <LoginButton />
            </template>
        </NavBar>
        <ProductList searchTerm="Element" />
        <CartSidebar />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { GetProductsUseCase, ProductsPloc } from "@machb/front-base";
import { GetCartUseCase, AddProductToCartUseCase, RemoveItemFromCartUseCase, EditQuantityOfCartItemUseCase, CheckoutOrderUseCase, CartPloc } from "@machb/front-base";
import { LoginPloc, RegistrationPloc } from "@machb/front-base";
import { AppsAuthProvider } from "./AppsAuthProvider";
import { CartAdapter } from "./CartAdapter";
import { ProductRestAdapter } from './ProductRestAdapter';

(window as any).apiBaseUrl = "/api";
document.title = "MachaOn-SL-OCI-1 Storefront";

const getProductsUseCase = new GetProductsUseCase(new ProductRestAdapter());

const cartRepository = new CartAdapter();
const authService = new AppsAuthProvider();

export default defineComponent({
    name: 'App',
    components: {},
    provide: {
        productsPloc: new ProductsPloc(getProductsUseCase),
        cartPloc: new CartPloc(
            new GetCartUseCase(cartRepository),
            new AddProductToCartUseCase(cartRepository),
            new RemoveItemFromCartUseCase(cartRepository),
            new EditQuantityOfCartItemUseCase(cartRepository),
            new CheckoutOrderUseCase(cartRepository)
        ),
        loginPloc: new LoginPloc(authService),
        registartionPloc: new RegistrationPloc(authService)
    }
});
</script>

<style>
@import url(@machb/vue-lib/dist/bundle.css);
@import url(./styles.css);
</style>
