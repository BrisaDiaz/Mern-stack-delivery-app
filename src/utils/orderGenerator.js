function generateOrderDescription(productsData, quantitySpecifications) {
  const orderDescription = productsData.reduce((data, product) => {
    const thisSpecifications = quantitySpecifications.find(
      (field) => field.productId == product._id
    );

    const thisBatchTotalCost = product.price * thisSpecifications.quantity;

    data.push({
      product: {
        name: product.name,
        price: product.price,
      },
      quantity: thisSpecifications.quantity,
      total: thisBatchTotalCost,
    });
    return data;
  }, []);

  return orderDescription;
}

function getTotalCost(orderDescription) {
  return orderDescription.reduce((sum, product) => (sum += product.total), 0);
}

function orderFactory({
  productsData,
  quantitySpecifications,
  clientId,
  orderId,
}) {
  if (
    productsData.length < 1 ||
    productsData.length !== quantitySpecifications.length
  )
    throw new Error("the products data provided is not valid");

  if (!clientId || !orderId)
    throw new Error(
      `the client id: ${clientId} and order id: ${orderId} are required`
    );

  const orderDescription = generateOrderDescription(
    productsData,
    quantitySpecifications
  );
  const orderTotalCost = getTotalCost(orderDescription);

  const order = {
    _id: orderId,
    client: clientId,
    description: orderDescription,
    total: orderTotalCost,
  };

  return order;
}

module.exports = orderFactory;
