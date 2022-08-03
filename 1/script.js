const calculate = document.querySelector('.calculate');
const resetBtn = document.querySelector('.reset');

calculate.addEventListener('click', (e) => {
    e.preventDefault();

    let itemA = () => {
      let billAmt = document.getElementById('amount_a').value;
      let qtyAmt = document.getElementById('qty_a').value
      let discountPcs = 231
      let totalPay = document.getElementById('total-pay_a')
      let discountAmt = document.getElementById('discount-amount_a');
      let FinalPay = document.getElementById('final-pay_a');

      if (qtyAmt <= 13) {
        totalPay.value = billAmt * qtyAmt
        return FinalPay.value = totalPay.value
      } else {
        totalPay.value = billAmt * qtyAmt
        discountAmt.value = qtyAmt * discountPcs;
        return FinalPay.value = totalPay.value - discountAmt.value;
      }
    }

    let itemB = () => {
      let billAmt = document.getElementById('amount_b').value;
      let qtyAmt = document.getElementById('qty_b').value
      let percentage = 23
      let totalPay = document.getElementById('total-pay_b')
      let discountAmt = document.getElementById('discount-amount_b');
      let FinalPay = document.getElementById('final-pay_b');

      if (qtyAmt <= 7) {
        totalPay.value = billAmt * qtyAmt
        return FinalPay.value = totalPay.value
      } else {
        totalPay.value = billAmt * qtyAmt
        discountAmt.value = Math.round(totalPay.value * percentage / 100);
        return FinalPay.value = Math.round(totalPay.value - discountAmt.value);
      }
    }

    let itemC  = () => {
      let billAmt = document.getElementById('amount_c').value;
      let qtyAmt = document.getElementById('qty_c').value
      let totalPay = document.getElementById('total-pay_c')
      let finalPay = document.getElementById('final-pay_c')
      totalPay.value = billAmt * qtyAmt
      return finalPay.value = billAmt * qtyAmt
    }

    total = parseInt(itemA()) + parseInt(itemB()) + parseInt(itemC())

    let finishTotal = document.getElementById('finish-total')
    finishTotal.value = total
});

resetBtn.addEventListener('click', () => {
    window.location.reload();
});