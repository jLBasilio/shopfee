const API_BASE = 'https://shopee.ph/api/v4/order/get_all_order_and_checkout_list';
const MAX_OFFSET = -1;
const COMPLETED_STATUS = 'label_order_completed';
const DIVISOR = 100000;


export async function calculatePurchases() {
  const items: any[] = [];
  let total = 0;
  let offset = 0;  
  let purchaseData;

  while (true) {
    const raw = await wrappedFetch(`${API_BASE}?offset=${offset}`);
    purchaseData = raw.data;
    if (purchaseData.next_offset === MAX_OFFSET) {
      return { total, items }
    }

    purchaseData.order_data.details_list.forEach(item => {
      const shouldNotInclude = item.status.status_label.text !== COMPLETED_STATUS;
      if (shouldNotInclude) return;
      const price = item.info_card.final_total / DIVISOR;
      items.push(price)
      console.log(item.info_card.order_list_cards[0].shop_info.shop_name);
      console.log(`${total} + ${price}`)
      total += price;

      console.log('newTotal', total)
    });

    offset = purchaseData.next_offset
  }
}

export function hello() {
  console.log('hello world');
}

export async function isLoggedIn() {
  const res = await wrappedFetch(API_BASE);  
  return res.data !== null;
}

export async function test() {
  const raw = await wrappedFetch(API_BASE);
  console.log(raw)
}


async function wrappedFetch (url: string) {
  const raw = await fetch(url);
  return await raw.json();
}
