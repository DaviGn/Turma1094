// import { useProducts } from '../../hooks/products';

import { useProductStore } from '../../stores/products';

export default function ProductsWidget() {
    // const { products, increment } = useProducts();
    const { count: products, increment } = useProductStore();

    return (
        <div>
            <h3>Produtos</h3>
            <p>{products}</p>
            <button type="button" onClick={() => increment()}>
                Add
            </button>
        </div>
    );
}
