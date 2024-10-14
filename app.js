// Função para salvar produtos no localStorage
function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(); // Atualiza a tabela ao adicionar produto
}

// Função para exibir produtos na tabela
function displayProducts() {
    const productTableBody = document.getElementById('product-table-body');
    productTableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os produtos
    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="4">Nenhum produto no estoque.</td></tr>';
        return;
    }

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>
                <button class="add-btn" data-index="${index}">Adicionar</button>
                <button class="remove-btn" data-index="${index}">Remover</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });

    // Eventos de adicionar e remover quantidade
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            addQuantity(index);
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            removeProduct(index);
        });
    });
}

// Função para adicionar quantidade ao produto
function addQuantity(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].quantity++;
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Função para remover produto (ou reduzir quantidade)
function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if (products[index].quantity > 1) {
        products[index].quantity--;
    } else {
        products.splice(index, 1); // Remove o produto se a quantidade for 1
    }

    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Lógica do dashboard
if (window.location.pathname.includes('index.html')) {
    document.getElementById('add-product').addEventListener('click', function () {
        const productName = document.getElementById('product-name').value;
        const productQuantity = document.getElementById('product-quantity').value;
        const productPrice = document.getElementById('product-price').value;

        // Verificar se os campos foram preenchidos corretamente
        if (productName && productQuantity && productPrice) {
            saveProduct({
                name: productName,
                quantity: parseInt(productQuantity),
                price: parseFloat(productPrice)
            });
            document.getElementById('product-name').value = ''; // Limpa o campo
            document.getElementById('product-quantity').value = ''; // Limpa o campo
            document.getElementById('product-price').value = ''; // Limpa o campo
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });

    displayProducts(); // Exibe os produtos ao carregar a página
}