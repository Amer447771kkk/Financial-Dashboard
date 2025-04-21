class Dashboard {
    constructor() {
        this.darkMode = new DarkModeManager();
        this.converter = new CurrencyConverter();
        this.init();
    }
    async init() {
        await this.updateExchangeRates();
        await this.updateCryptoPrices();
        this.startAutoRefresh();
    }
    async updateExchangeRates() {
        const rates = await APIService.fetchExchangeRates();
        if (rates) {
            document.getElementById('usdEgp').textContent = `${rates.EGP.toFixed(2)} EGP`;
            document.getElementById('usdSar').textContent = `${rates.SAR.toFixed(2)} SAR`;
        }
    }
    async updateCryptoPrices() {
        const cryptoData = await APIService.fetchCryptoData();
        if (cryptoData) {
            document.getElementById('btcPrice').textContent = `$${cryptoData.btc.toFixed(2)}`;
            document.getElementById('ethPrice').textContent = `$${cryptoData.eth.toFixed(2)}`;
            document.getElementById('xrpPrice').textContent = `$${cryptoData.xrp.toFixed(2)}`;
        }
    }

    startAutoRefresh() {
        // Refresh data every 5 minutes
        setInterval(() => {
            this.updateExchangeRates();
            this.updateCryptoPrices();
        }, 300000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});