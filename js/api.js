const API_KEY = '51e440da3cd39339c9aefe77'; // Replace with your exchangerate-api key

class APIService {
    static async fetchExchangeRates() {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            return null;
        }
    }

    static async fetchCryptoData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd');
            const data = await response.json();
            return {
                btc: data.bitcoin.usd,
                eth: data.ethereum.usd,
                xrp: data.ripple.usd
            };
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            return null;
        }
    }
}