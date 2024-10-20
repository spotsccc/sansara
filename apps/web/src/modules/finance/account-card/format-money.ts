import type { Money } from '@repo/models/finance'

export function formatMoney(money: Money) {
  const int = formatInt(money)
  const float = formatFloat(money)

  return `${int}.${float} ${money.currency}`
}

function formatFloat(money: Money) {
  const float = money.amount.slice(money.amount.length - money.accuracy)

  if (float.length === 0) {
    return '00'
  }

  if (float.length === 1) {
    return `${float}0`
  }

  return float
}

function formatInt(money: Money) {
  const int = money.amount.slice(0, money.amount.length - money.accuracy)

  if (int.length === 0) {
    return '0'
  }

  return int
}
