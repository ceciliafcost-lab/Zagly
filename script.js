const SUPABASE_URL = "https://rtoxpbbncijjpdrtvqcb.supabase.co";
const SUPABASE_KEY = "COLE_SUA_PUBLISHABLE_KEY_AQUI";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
/* ==================================================
   PRODUTOS
================================================== */

const products = [

    {
        id: 1,
        name: "Camiseta Básica Preta",
        category: "Camisetas",
        price: 49.90,

        images: [
            "IMAGENS/camiseta-preta.jpg",
            "IMAGENS/camiseta-preta-2.jpg"
        ],

        sizes: ["P", "M", "G", "GG", "XGG"],

        description:
            "Camiseta básica, versátil e fácil de combinar para todos os dias."
    },


    {
        id: 2,
        name: "Camiseta Básica Branca",
        category: "Camisetas",
        price: 49.90,

        images: [
            "IMAGENS/camiseta-branca.jpg"
        ],

        sizes: ["P", "M", "G", "GG", "XGG"],

        description:
            "Uma peça essencial para diferentes combinações e momentos."
    },


    {
        id: 3,
        name: "Camiseta Básica Bege",
        category: "Camisetas",
        price: 49.90,

        images: [
            "IMAGENS/camiseta-bege.jpg"
        ],

        sizes: ["P", "M", "G", "GG", "XGG"],

        description:
            "Uma básica neutra e versátil para acompanhar sua rotina."
    },


    {
        id: 4,
        name: "Bermuda Básica",
        category: "Bermudas",
        price: 69.90,

        images: [
            "IMAGENS/bermuda.jpg"
        ],

        sizes: ["38", "40", "42", "44", "46", "50"],

        description:
            "Bermuda básica e confortável para diferentes combinações."
    }

];


/* ==================================================
   CONFIGURAÇÕES DA LOJA
================================================== */

const STORE_CONFIG = {

    pixDiscountMinimum: 100,

    pixDiscountPercent: 10,

    shipping: 0,

    // ALTERE SOMENTE ESTA LINHA SE O WHATSAPP MUDAR
    whatsapp: "5584988240101"

};


/* ==================================================
   CARRINHO
================================================== */

let cart = [];

let selectedProduct = null;

let selectedQuantity = 1;

let currentImageIndex = 0;

let selectedDelivery = "";

let selectedPayment = "";


/* ==================================================
   FORMATAÇÃO DE VALORES
================================================== */

function formatMoney(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==================================================
   MOSTRAR PRODUTOS
================================================== */

function renderProducts(category) {

    const productsGrid =
        document.getElementById(
            "products-grid"
        );


    productsGrid.innerHTML = "";


    let productsToShow = products;


    if (
        category &&
        category !== "Todos"
    ) {

        productsToShow =
            products.filter(
                function(product) {

                    return product.category === category;

                }
            );

    }


    productsToShow.forEach(
        function(product) {

            const productCard =
                document.createElement("div");


            productCard.className =
                "product-card";


            productCard.innerHTML = `

                <div
                    class="product-image"
                    onclick="openProduct(${product.id})"
                >

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                    >

                </div>


                <div
                    class="product-info"
                    onclick="openProduct(${product.id})"
                >

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${formatMoney(product.price)}
                    </p>

                </div>

            `;


            productsGrid.appendChild(
                productCard
            );

        }
    );

}


/* ==================================================
   FILTROS
================================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );


categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.getAttribute(
                        "data-category"
                    );


                renderProducts(category);

            }
        );

    }
);


/* ==================================================
   ABRIR PRODUTO
================================================== */

function openProduct(productId) {

    const product =
        products.find(
            function(item) {

                return item.id === productId;

            }
        );


    if (!product) {
        return;
    }


    selectedProduct = product;

    selectedQuantity = 1;

    currentImageIndex = 0;


    const modal =
        document.getElementById(
            "product-modal"
        );


    document.getElementById(
        "modal-product-name"
    ).textContent =
        product.name;


    document.getElementById(
        "modal-product-price"
    ).textContent =
        formatMoney(product.price);


    document.getElementById(
        "modal-product-description"
    ).textContent =
        product.description;


    document.getElementById(
        "modal-quantity"
    ).textContent =
        selectedQuantity;


    const modalSizes =
        document.getElementById(
            "modal-product-sizes"
        );


    modalSizes.innerHTML = "";


    product.sizes.forEach(
        function(size) {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.textContent = size;

            button.className =
                "size-button";


            button.addEventListener(
                "click",
                function() {

                    document
                        .querySelectorAll(
                            ".size-button"
                        )
                        .forEach(
                            function(item) {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );

                }
            );


            modalSizes.appendChild(
                button
            );

        }
    );


    renderProductGallery();


    modal.classList.add(
        "active"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* ==================================================
   GALERIA
================================================== */

function renderProductGallery() {

    if (!selectedProduct) {
        return;
    }


    const modalImage =
        document.getElementById(
            "modal-product-image"
        );


    const thumbnails =
        document.getElementById(
            "product-thumbnails"
        );


    const images =
        selectedProduct.images;


    modalImage.src =
        images[currentImageIndex];


    modalImage.alt =
        selectedProduct.name;


    thumbnails.innerHTML = "";


    images.forEach(
        function(image, index) {

            const thumbnail =
                document.createElement(
                    "button"
                );


            thumbnail.type =
                "button";


            thumbnail.className =
                "product-thumbnail";


            if (
                index === currentImageIndex
            ) {

                thumbnail.classList.add(
                    "active"
                );

            }


            thumbnail.innerHTML = `

                <img
                    src="${image}"
                    alt="${selectedProduct.name}"
                >

            `;


            thumbnail.addEventListener(
                "click",
                function() {

                    currentImageIndex =
                        index;

                    renderProductGallery();

                }
            );


            thumbnails.appendChild(
                thumbnail
            );

        }
    );

}


/* ==================================================
   PRÓXIMA IMAGEM
================================================== */

function nextProductImage() {

    if (!selectedProduct) {
        return;
    }


    const totalImages =
        selectedProduct.images.length;


    if (totalImages <= 1) {
        return;
    }


    currentImageIndex += 1;


    if (
        currentImageIndex >= totalImages
    ) {

        currentImageIndex = 0;

    }


    renderProductGallery();

}


/* ==================================================
   IMAGEM ANTERIOR
================================================== */

function previousProductImage() {

    if (!selectedProduct) {
        return;
    }


    const totalImages =
        selectedProduct.images.length;


    if (totalImages <= 1) {
        return;
    }


    currentImageIndex -= 1;


    if (
        currentImageIndex < 0
    ) {

        currentImageIndex =
            totalImages - 1;

    }


    renderProductGallery();

}


/* ==================================================
   FECHAR PRODUTO
================================================== */

function closeProduct() {

    const modal =
        document.getElementById(
            "product-modal"
        );


    modal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "modal-open"
    );


    selectedProduct = null;

}


/* ==================================================
   QUANTIDADE DO PRODUTO
================================================== */

function increaseProductQuantity() {

    selectedQuantity += 1;


    document.getElementById(
        "modal-quantity"
    ).textContent =
        selectedQuantity;

}


function decreaseProductQuantity() {

    if (selectedQuantity > 1) {

        selectedQuantity -= 1;

    }


    document.getElementById(
        "modal-quantity"
    ).textContent =
        selectedQuantity;

}


/* ==================================================
   ADICIONAR AO CARRINHO
================================================== */

function addProductToCart() {

    if (!selectedProduct) {
        return;
    }


    const selectedSizeButton =
        document.querySelector(
            ".size-button.selected"
        );


    if (!selectedSizeButton) {

        alert(
            "Selecione um tamanho."
        );

        return;
    }


    const selectedSize =
        selectedSizeButton.textContent;


    const existingItem =
        cart.find(
            function(item) {

                return (
                    item.id === selectedProduct.id &&
                    item.selectedSize === selectedSize
                );

            }
        );


    if (existingItem) {

        existingItem.quantity +=
            selectedQuantity;

    } else {

        cart.push({

            ...selectedProduct,

            selectedSize:
                selectedSize,

            quantity:
                selectedQuantity

        });

    }


    updateCart();

    closeProduct();

    openCart();

}


/* ==================================================
   ATUALIZAR CARRINHO
================================================== */

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    cart.forEach(
        function(product, index) {

            const productTotal =
                product.price *
                product.quantity;


            total += productTotal;

            totalItems +=
                product.quantity;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-item-info">

                    <p class="cart-item-name">
                        ${product.name}
                    </p>

                    <p class="cart-item-price">
                        Tamanho:
                        ${product.selectedSize}
                    </p>

                    <p class="cart-item-price">
                        ${formatMoney(product.price)}
                    </p>

                    <div class="quantity-control">

                        <button
                            type="button"
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            type="button"
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                    >
                        Remover
                    </button>

                </div>

            `;


            cartItems.appendChild(
                item
            );

        }
    );


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>

        `;

    }


    cartTotal.textContent =
        formatMoney(total);


    cartCount.textContent =
        totalItems;

}


/* ==================================================
   QUANTIDADE NO CARRINHO
================================================== */

function increaseQuantity(index) {

    cart[index].quantity += 1;

    updateCart();


    if (
        document
            .getElementById(
                "checkout-page"
            )
            .classList.contains("active")
    ) {

        renderCheckoutSummary();

    }

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }


    updateCart();


    if (
        document
            .getElementById(
                "checkout-page"
            )
            .classList.contains("active")
    ) {

        renderCheckoutSummary();

    }

}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();


    if (
        document
            .getElementById(
                "checkout-page"
            )
            .classList.contains("active")
    ) {

        if (cart.length === 0) {

            closeCheckout();

        } else {

            renderCheckoutSummary();

        }

    }

}


/* ==================================================
   ABRIR CARRINHO
================================================== */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");


    document
        .getElementById("cart-overlay")
        .classList.add("active");

}


/* ==================================================
   FECHAR CARRINHO
================================================== */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");


    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}


/* ==================================================
   CÁLCULO DO CHECKOUT
================================================== */

function calculateCheckoutValues() {

    let subtotal = 0;


    cart.forEach(
        function(product) {

            subtotal +=
                product.price *
                product.quantity;

        }
    );


    const shipping =
        STORE_CONFIG.shipping;


    let discount = 0;


    if (
        selectedPayment === "pix" &&
        subtotal >=
            STORE_CONFIG.pixDiscountMinimum
    ) {

        discount =
            subtotal *
            (STORE_CONFIG.pixDiscountPercent / 100);

    }


    const total =
        subtotal +
        shipping -
        discount;


    return {

        subtotal:
            subtotal,

        shipping:
            shipping,

        discount:
            discount,

        total:
            total

    };

}


/* ==================================================
   ABRIR CHECKOUT
================================================== */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    closeCart();


    const checkoutPage =
        document.getElementById(
            "checkout-page"
        );


    const success =
        document.getElementById(
            "order-success"
        );


    success.classList.remove(
        "active"
    );


    document
        .querySelector(
            ".checkout-content"
        )
        .style.display = "";


    document
        .querySelector(
            ".checkout-header"
        )
        .style.display = "";


    selectedDelivery = "";

    selectedPayment = "";


    document
        .querySelectorAll(
            ".delivery-option"
        )
        .forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

            }
        );


    document
        .querySelectorAll(
            ".payment-method"
        )
        .forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

                const check =
                    button.querySelector(
                        ".payment-check"
                    );

                if (check) {
                    check.textContent = "○";
                }

            }
        );


    document.getElementById(
        "checkout-delivery"
    ).value = "";


    document.getElementById(
        "checkout-payment"
    ).value = "";


    document.getElementById(
        "checkout-payment-info"
    ).innerHTML = "";


    document
        .getElementById(
            "checkout-payment-info"
        )
        .classList.remove(
            "visible"
        );


    document
        .getElementById(
            "checkout-address-section"
        )
        .classList.remove(
            "hidden"
        );


    renderCheckoutSummary();


    checkoutPage.classList.add(
        "active"
    );


    document.body.classList.add(
        "checkout-open"
    );


    checkoutPage.scrollTop = 0;

}


/* ==================================================
   FECHAR CHECKOUT
================================================== */

function closeCheckout() {

    const checkoutPage =
        document.getElementById(
            "checkout-page"
        );


    checkoutPage.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "checkout-open"
    );

}


/* ==================================================
   RESUMO DO CHECKOUT
================================================== */

function renderCheckoutSummary() {

    const summaryItems =
        document.getElementById(
            "checkout-summary-items"
        );


    const summarySubtotal =
        document.getElementById(
            "checkout-subtotal"
        );


    const summaryShipping =
        document.getElementById(
            "checkout-shipping"
        );


    const summaryDiscount =
        document.getElementById(
            "checkout-discount"
        );


    const summaryDiscountRow =
        document.getElementById(
            "checkout-discount-row"
        );


    const summaryTotal =
        document.getElementById(
            "checkout-summary-total"
        );


    summaryItems.innerHTML = "";


    cart.forEach(
        function(product) {

            const productTotal =
                product.price *
                product.quantity;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "checkout-summary-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        ${product.quantity}x
                        · Tamanho ${product.selectedSize}
                    </p>

                </div>

                <span>
                    ${formatMoney(productTotal)}
                </span>

            `;


            summaryItems.appendChild(
                item
            );

        }
    );


    const values =
        calculateCheckoutValues();


    summarySubtotal.textContent =
        formatMoney(
            values.subtotal
        );


    summaryShipping.textContent =
        values.shipping === 0
            ? "Grátis"
            : formatMoney(values.shipping);


    if (
        values.discount > 0
    ) {

        summaryDiscount.textContent =
            `- ${formatMoney(values.discount)}`;

        summaryDiscountRow.classList.add(
            "visible"
        );

    } else {

        summaryDiscountRow.classList.remove(
            "visible"
        );

    }


    summaryTotal.textContent =
        formatMoney(
            values.total
        );

}


/* ==================================================
   SELEÇÃO DE RECEBIMENTO
================================================== */

const deliveryOptions =
    document.querySelectorAll(
        ".delivery-option"
    );


deliveryOptions.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                deliveryOptions.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedDelivery =
                    button.getAttribute(
                        "data-delivery"
                    );


                document.getElementById(
                    "checkout-delivery"
                ).value =
                    selectedDelivery;


                const addressSection =
                    document.getElementById(
                        "checkout-address-section"
                    );


                if (
                    selectedDelivery ===
                    "retirada"
                ) {

                    addressSection.classList.add(
                        "hidden"
                    );

                } else {

                    addressSection.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    }
);


/* ==================================================
   SELEÇÃO DE PAGAMENTO
================================================== */

const paymentMethods =
    document.querySelectorAll(
        ".payment-method"
    );


paymentMethods.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                paymentMethods.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );


                        const check =
                            item.querySelector(
                                ".payment-check"
                            );

                        if (check) {
                            check.textContent = "○";
                        }

                    }
                );


                button.classList.add(
                    "active"
                );


                const currentCheck =
                    button.querySelector(
                        ".payment-check"
                    );


                if (currentCheck) {
                    currentCheck.textContent = "●";
                }


                selectedPayment =
                    button.getAttribute(
                        "data-payment"
                    );


                document.getElementById(
                    "checkout-payment"
                ).value =
                    selectedPayment;


                updatePaymentInformation();

                renderCheckoutSummary();

            }
        );

    }
);


/* ==================================================
   INFORMAÇÃO DO PAGAMENTO
================================================== */

function updatePaymentInformation() {

    const paymentInfo =
        document.getElementById(
            "checkout-payment-info"
        );


    paymentInfo.innerHTML = "";


    if (
        selectedPayment === "pix"
    ) {

        const subtotal =
            calculateCheckoutValues()
                .subtotal;


        if (
            subtotal >=
            STORE_CONFIG.pixDiscountMinimum
        ) {

            paymentInfo.innerHTML = `

                <p>
                    Você receberá
                    <strong>10% de desconto</strong>
                    no valor dos produtos.
                    O frete não entra no cálculo do desconto.
                </p>

            `;

        } else {

            const remaining =
                STORE_CONFIG.pixDiscountMinimum -
                subtotal;


            paymentInfo.innerHTML = `

                <p>
                    Compras a partir de
                    <strong>R$ 100,00</strong>
                    recebem 10% de desconto no Pix.
                    Faltam ${formatMoney(remaining)}
                    para alcançar o desconto.
                </p>

            `;

        }


        paymentInfo.classList.add(
            "visible"
        );

        return;

    }


    if (
        selectedPayment === "card"
    ) {

        const subtotal =
            calculateCheckoutValues()
                .subtotal;


        let installments = 1;


        if (subtotal >= 1500) {

            installments = 6;

        } else if (subtotal >= 1000) {

            installments = 5;

        } else if (subtotal >= 500) {

            installments = 4;

        } else if (subtotal >= 300) {

            installments = 3;

        } else if (subtotal >= 200) {

            installments = 2;

        }


        if (installments === 1) {

            paymentInfo.innerHTML = `

                <p>
                    O parcelamento sem juros começa
                    a partir de compras de
                    <strong>R$ 200,00</strong>.
                </p>

            `;

        } else {

            const installmentValue =
                subtotal / installments;


            paymentInfo.innerHTML = `

                <p>
                    Você pode pagar em até
                    <strong>${installments}x sem juros</strong>
                    de ${formatMoney(installmentValue)}.
                </p>

            `;

        }


        paymentInfo.classList.add(
            "visible"
        );

        return;

    }


    paymentInfo.classList.remove(
        "visible"
    );

}


/* ==================================================
   VALIDAÇÃO DO CHECKOUT
================================================== */

function validateCheckout() {

    const name =
        document.getElementById(
            "checkout-name"
        ).value.trim();


    const whatsapp =
        document.getElementById(
            "checkout-whatsapp"
        ).value.trim();


    const email =
        document.getElementById(
            "checkout-email"
        ).value.trim();


    if (
        !name ||
        !whatsapp ||
        !email
    ) {

        alert(
            "Preencha seus dados para continuar."
        );

        return false;

    }


    if (!selectedDelivery) {

        alert(
            "Escolha como você quer receber o pedido."
        );

        return false;

    }


    if (
        selectedDelivery ===
        "entrega"
    ) {

        const cep =
            document.getElementById(
                "checkout-cep"
            ).value.trim();


        const city =
            document.getElementById(
                "checkout-city"
            ).value.trim();


        const address =
            document.getElementById(
                "checkout-address"
            ).value.trim();


        const number =
            document.getElementById(
                "checkout-number"
            ).value.trim();


        const neighborhood =
            document.getElementById(
                "checkout-neighborhood"
            ).value.trim();


        const state =
            document.getElementById(
                "checkout-state"
            ).value;


        if (
            !cep ||
            !city ||
            !address ||
            !number ||
            !neighborhood ||
            !state
        ) {

            alert(
                "Preencha o endereço de entrega."
            );

            return false;

        }

    }


    if (!selectedPayment) {

        alert(
            "Escolha uma forma de pagamento."
        );

        return false;

    }


    return true;

}


/* ==================================================
   GERAR PEDIDO PARA WHATSAPP
================================================== */

function sendOrderToWhatsApp() {

    const values =
        calculateCheckoutValues();


    const name =
        document.getElementById(
            "checkout-name"
        ).value.trim();


    const customerWhatsapp =
        document.getElementById(
            "checkout-whatsapp"
        ).value.trim();


    const email =
        document.getElementById(
            "checkout-email"
        ).value.trim();


    let message = "";


    message +=
        "Olá! Vim pelo site da Zagly e gostaria de finalizar meu pedido.\n\n";


    message +=
        "*DADOS DO CLIENTE*\n";

    message +=
        `Nome: ${name}\n`;

    message +=
        `WhatsApp: ${customerWhatsapp}\n`;


    if (email) {

        message +=
            `E-mail: ${email}\n`;

    }


    message +=
        "\n*PEDIDO*\n";


    cart.forEach(
        function(product) {

            const productTotal =
                product.price *
                product.quantity;


            message +=
                `• ${product.name}\n`;

            message +=
                `  Tamanho: ${product.selectedSize}\n`;

            message +=
                `  Quantidade: ${product.quantity}\n`;

            message +=
                `  Valor: ${formatMoney(productTotal)}\n\n`;

        }
    );


    message +=
        "*RECEBIMENTO*\n";


    if (
        selectedDelivery === "retirada"
    ) {

        message +=
            "Retirada\n";

    } else {

        message +=
            "Entrega\n";


        const cep =
            document.getElementById(
                "checkout-cep"
            ).value.trim();


        const city =
            document.getElementById(
                "checkout-city"
            ).value.trim();


        const address =
            document.getElementById(
                "checkout-address"
            ).value.trim();


        const number =
            document.getElementById(
                "checkout-number"
            ).value.trim();


        const complement =
            document.getElementById(
                "checkout-complement"
            ).value.trim();


        const neighborhood =
            document.getElementById(
                "checkout-neighborhood"
            ).value.trim();


        const state =
            document.getElementById(
                "checkout-state"
            ).value;


        message +=
            `Endereço: ${address}, ${number}\n`;

        message +=
            `Bairro: ${neighborhood}\n`;

        message +=
            `Cidade: ${city} - ${state}\n`;

        message +=
            `CEP: ${cep}\n`;


        if (complement) {

            message +=
                `Complemento: ${complement}\n`;

        }

    }


    message +=
        "\n*PAGAMENTO*\n";


    if (
        selectedPayment === "pix"
    ) {

        message +=
            "Pix\n";

    } else {

        message +=
            "Cartão de crédito\n";

    }


    message +=
        "\n*RESUMO DO PEDIDO*\n";


    message +=
        `Subtotal: ${formatMoney(values.subtotal)}\n`;


    message +=
        `Frete: ${
            values.shipping === 0
                ? "Grátis"
                : formatMoney(values.shipping)
        }\n`;


    if (
        values.discount > 0
    ) {

        message +=
            `Desconto Pix: - ${formatMoney(values.discount)}\n`;

    }


    message +=
        `*Total: ${formatMoney(values.total)}*`;


    const whatsappUrl =
        `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/* ==================================================
   CONFIRMAÇÃO DO PEDIDO
================================================== */

function showOrderConfirmation() {

    const checkoutHeader =
        document.querySelector(
            ".checkout-header"
        );


    const checkoutContent =
        document.querySelector(
            ".checkout-content"
        );


    const orderSuccess =
        document.getElementById(
            "order-success"
        );


    checkoutHeader.style.display =
        "none";


    checkoutContent.style.display =
        "none";


    orderSuccess.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==================================================
   VOLTAR PARA A LOJA
================================================== */

function backToStore() {

    const checkoutPage =
        document.getElementById(
            "checkout-page"
        );


    const checkoutHeader =
        document.querySelector(
            ".checkout-header"
        );


    const checkoutContent =
        document.querySelector(
            ".checkout-content"
        );


    const orderSuccess =
        document.getElementById(
            "order-success"
        );


    orderSuccess.classList.remove(
        "active"
    );


    checkoutHeader.style.display =
        "";


    checkoutContent.style.display =
        "";


    checkoutPage.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "checkout-open"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==================================================
   CONTINUAR PARA PAGAMENTO
================================================== */

document
    .getElementById(
        "continue-checkout-button"
    )
    .addEventListener(
        "click",
        function() {

            if (
                !validateCheckout()
            ) {

                return;

            }


            const customerData = {

                name:
                    document
                        .getElementById(
                            "checkout-name"
                        )
                        .value
                        .trim(),

                whatsapp:
                    document
                        .getElementById(
                            "checkout-whatsapp"
                        )
                        .value
                        .trim(),

                email:
                    document
                        .getElementById(
                            "checkout-email"
                        )
                        .value
                        .trim(),

                delivery:
                    selectedDelivery,

                cep:
                    document
                        .getElementById(
                            "checkout-cep"
                        )
                        .value
                        .trim(),

                city:
                    document
                        .getElementById(
                            "checkout-city"
                        )
                        .value
                        .trim(),

                address:
                    document
                        .getElementById(
                            "checkout-address"
                        )
                        .value
                        .trim(),

                number:
                    document
                        .getElementById(
                            "checkout-number"
                        )
                        .value
                        .trim(),

                complement:
                    document
                        .getElementById(
                            "checkout-complement"
                        )
                        .value
                        .trim(),

                neighborhood:
                    document
                        .getElementById(
                            "checkout-neighborhood"
                        )
                        .value
                        .trim(),

                state:
                    document
                        .getElementById(
                            "checkout-state"
                        )
                        .value,

                payment:
                    selectedPayment,

                totals:
                    calculateCheckoutValues()

            };


            localStorage.setItem(
                "zaglyCustomer",
                JSON.stringify(
                    customerData
                )
            );


            /*
             * Primeiro abrimos o WhatsApp.
             * Depois mostramos a confirmação
             * na página da Zagly.
             */

            sendOrderToWhatsApp();


            /*
             * Limpamos o carrinho depois
             * que o pedido foi encaminhado.
             */

            cart = [];

            updateCart();


            showOrderConfirmation();

        }
    );


/* ==================================================
   BOTÃO DA CONFIRMAÇÃO
================================================== */

document
    .getElementById(
        "order-success-button"
    )
    .addEventListener(
        "click",
        backToStore
    );


/* ==================================================
   BOTÕES DO CARRINHO
================================================== */

document
    .getElementById(
        "open-cart"
    )
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById(
        "close-cart"
    )
    .addEventListener(
        "click",
        closeCart
    );


document
    .getElementById(
        "cart-overlay"
    )
    .addEventListener(
        "click",
        closeCart
    );


/* ==================================================
   FINALIZAR COMPRA
================================================== */

document
    .getElementById(
        "checkout-button"
    )
    .addEventListener(
        "click",
        openCheckout
    );


/* ==================================================
   VOLTAR DO CHECKOUT
================================================== */

document
    .getElementById(
        "checkout-back"
    )
    .addEventListener(
        "click",
        closeCheckout
    );


/* ==================================================
   ESC
================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.getElementById(
                    "product-modal"
                );


            if (
                modal.classList.contains(
                    "active"
                )
            ) {

                closeProduct();

            }


            const cartElement =
                document.getElementById(
                    "cart"
                );


            if (
                cartElement.classList.contains(
                    "open"
                )
            ) {

                closeCart();

            }

        }

    }
);


/* ==================================================
   INICIAR LOJA
================================================== */

renderProducts("Todos");

updateCart();
