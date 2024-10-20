export function formatAmount(amount: string) {
  const indexOfPoint = amount.indexOf('.') === -1 ? amount.length : amount.indexOf('.')

  const formattedAmount = amount.replace('.', '')
  const accuracy = amount.length - indexOfPoint

  return {
    accuracy,
    amount: trimLeftZeroes(formattedAmount)
  }
}

export function trimLeftZeroes(integerPart: string) {
  let i = 0
  for (; i < integerPart.length; i++) {
    if (integerPart[i] !== '0') {
      break
    }
  }

  if (i === integerPart.length) {
    return '0'
  }

  return integerPart.slice(i)
}
