export default function() {
  return {
    methods: {
      chooseCart(
        type,
        shop_id,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
        food
      ) {
        if (type === "add") {
          this.$store.commit("buyCart/addToCart", {
            shop_id,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
            packing_fee,
            sku_id,
            stock,
            food,
          });
        } else if (type === "remove") {
          this.$store.commit("buyCart/removeToCart", {
            shop_id,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
          });
        }
      },
    },
  };
}
