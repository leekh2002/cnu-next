// ProductCartPage.tsx
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { ProductItem } from "@/types/Product";
import CartList from "./CartList";

export default function ProductCart({ items }: { items: ProductItem[] }) {
  const [cart, setCart] = useState<{ [id: string]: number }>({}); // {"88159814281" : 1}
  const [showCart, setShowCart] = useState(false); //  과제 2.1

  //  카트에 담기
  const handleAddToCart = (item: ProductItem, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      [item.productId]: quantity,
    }));

    localStorage.setItem(item.productId, quantity + "");
    localStorage.getItem(item.productId);
  };

  /* 과제 2-3: Cart 아이템 지우기 */
  const handleRemoveFromCart = (productIdToRemove: string) => {
    
    setCart((prevCart) => {
      
      const cartEntries = Object.entries(prevCart);

      
      const updatedCartEntries = cartEntries.filter(
        ([productId, quantity]) => productId !== productIdToRemove
      );

      
      const updatedCart = Object.fromEntries(updatedCartEntries);

      
      return updatedCart;
    });

    
    localStorage.removeItem(productIdToRemove);
    
  };


  useEffect(() => {
    
    const hasItems = Object.keys(cart).length > 0;
    
    setShowCart(hasItems);
  }, [cart]);

  return (
    <div className="p-10">
      {/* 상품 리스트 */}
      <ProductList items={items} onAddToCart={handleAddToCart} />
      {/* 장바구니 */}
      {/* 2.1. 조건부 카트 보이기: 카트에 담긴 상품이 없으면 카트가 보이지 않고, 카트에 담긴 물건이 있으면 카트가 보인다 */}
      {showCart && (
        <CartList
          cart={cart}
          products={items}
          onRemove={handleRemoveFromCart} // 만든 삭제 함수를 CartList에 넘겨줘!
        />
      )}
    </div>
  );
}
