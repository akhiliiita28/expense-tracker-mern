import moment from 'moment'

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};
export const getInitials = (name) => {
  if (!name) return "";


  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
export const addThousandsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".")
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;

};

const EMOJI_CDN_URL_REGEX = /emoji-datasource-[^/]+\/img\/[^/]+\/64\/([a-f0-9-]+)\.png$/i;

export const normalizeEmojiIcon = (icon) => {
  if (typeof icon !== "string" || !icon.trim()) return "";

  const trimmedIcon = icon.trim();
  const emojiUrlMatch = trimmedIcon.match(EMOJI_CDN_URL_REGEX);

  if (!emojiUrlMatch) {
    return trimmedIcon;
  }

  try {
    const codePoints = emojiUrlMatch[1]
      .split("-")
      .map((part) => Number.parseInt(part, 16))
      .filter((value) => !Number.isNaN(value));

    return codePoints.length ? String.fromCodePoint(...codePoints) : trimmedIcon;
  } catch {
    return trimmedIcon;
  }
}

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }))
  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
  const groupedByDay = [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((accumulator, item) => {
      const dayKey = moment(item?.date).format("YYYY-MM-DD");
      const existingDay = accumulator[dayKey];

      if (existingDay) {
        existingDay.amount += Number(item?.amount) || 0;
        existingDay.transactionCount += 1;

        if (item?.source) {
          existingDay.sources.push(item.source);
        }

        return accumulator;
      }

      accumulator[dayKey] = {
        month: moment(item?.date).format("Do MMM"),
        category: moment(item?.date).format("Do MMM"),
        amount: Number(item?.amount) || 0,
        source: item?.source || "",
        sources: item?.source ? [item.source] : [],
        transactionCount: 1,
      };

      return accumulator;
    }, {});

  return Object.values(groupedByDay);
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    category: item?.category,
    amount: item?.amount,
    month: moment(item?.date).format("Do MMM")
  }))
  return chartData;
}