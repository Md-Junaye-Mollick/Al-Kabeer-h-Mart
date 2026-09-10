import React, { useState } from 'react';
import {
  Banknote,
  QrCode,
  CreditCard,
  Building2,
  Copy,
  Check,
  ShieldAlert,
  Info,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PaymentOptions({
  selectedMethod,
  onSelectMethod,
  paymentDetails,
  onUpdatePaymentDetails,
}) {
  const { t } = useLanguage();
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('alkabeermart@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    onUpdatePaymentDetails({
      ...paymentDetails,
      cardNumber: val,
    });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    onUpdatePaymentDetails({
      ...paymentDetails,
      cardExpiry: val,
    });
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 3);
    onUpdatePaymentDetails({
      ...paymentDetails,
      cardCvv: val,
    });
  };

  const handleCardNameChange = (e) => {
    onUpdatePaymentDetails({
      ...paymentDetails,
      cardName: e.target.value,
    });
  };

  const handleBankSelect = (bankName) => {
    onUpdatePaymentDetails({
      ...paymentDetails,
      selectedBank: bankName,
    });
  };

  const popularBanks = [
    { id: 'sbi', name: 'State Bank of India (SBI)', code: 'SBI' },
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
    { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
    { id: 'pnb', name: 'Punjab National Bank (PNB)', code: 'PNB' },
    { id: 'other', name: 'Other Indian Bank', code: 'OTHER' },
  ];

  return (
    <div className="space-y-3">
      
      {/* 1. CASH ON DELIVERY (COD) */}
      <div
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          selectedMethod === 'cod'
            ? 'bg-primary-light/30 border-primary shadow-xs ring-1 ring-primary/30'
            : 'bg-surface hover:bg-surface-soft/60 border-border'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectMethod('cod')}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                selectedMethod === 'cod' ? 'border-primary bg-primary text-white' : 'border-border bg-surface'
              }`}
            >
              {selectedMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-text-primary block">
                {t('checkout.cod')}
              </span>
              <span className="text-[11px] text-text-secondary">
                {t('checkout.codDesc')}
              </span>
            </div>
          </div>
          <Banknote className={`w-5 h-5 transition-colors ${selectedMethod === 'cod' ? 'text-primary' : 'text-text-muted'}`} />
        </button>

        {/* Expandable COD Content */}
        {selectedMethod === 'cod' && (
          <div className="px-4 pb-4 pt-1 text-xs text-text-secondary border-t border-primary/10 animate-fade-in space-y-2">
            <div className="p-3 bg-surface rounded-xl border border-border/80 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text-primary">
                  Pay for your order when it is delivered to your doorstep.
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  Our Bhagabatipur delivery partner accepts Cash and instant UPI QR payments on delivery.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. UPI / QR CODE */}
      <div
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          selectedMethod === 'upi'
            ? 'bg-primary-light/30 border-primary shadow-xs ring-1 ring-primary/30'
            : 'bg-surface hover:bg-surface-soft/60 border-border'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectMethod('upi')}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                selectedMethod === 'upi' ? 'border-primary bg-primary text-white' : 'border-border bg-surface'
              }`}
            >
              {selectedMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-text-primary block">
                {t('checkout.upi')}
              </span>
              <span className="text-[11px] text-text-secondary">
                {t('checkout.upiDesc')}
              </span>
            </div>
          </div>
          <QrCode className={`w-5 h-5 transition-colors ${selectedMethod === 'upi' ? 'text-primary' : 'text-text-muted'}`} />
        </button>

        {/* Expandable UPI / QR Content */}
        {selectedMethod === 'upi' && (
          <div className="px-4 pb-4 pt-2 border-t border-primary/10 animate-fade-in space-y-3.5">
            <div className="bg-surface p-4 rounded-2xl border border-border/80 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Stylized QR Code Visual */}
              <div className="p-3 bg-white rounded-2xl border border-border/80 shadow-xs flex flex-col items-center justify-center shrink-0">
                <svg
                  className="w-28 h-28 text-gray-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner markers */}
                  <rect x="5" y="5" width="28" height="28" fill="black" rx="4" />
                  <rect x="9" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="black" rx="2" />

                  <rect x="67" y="5" width="28" height="28" fill="black" rx="4" />
                  <rect x="71" y="9" width="20" height="20" fill="white" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="black" rx="2" />

                  <rect x="5" y="67" width="28" height="28" fill="black" rx="4" />
                  <rect x="9" y="71" width="20" height="20" fill="white" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="black" rx="2" />

                  {/* QR Grid Pattern simulation */}
                  <rect x="38" y="8" width="6" height="6" fill="black" />
                  <rect x="48" y="8" width="6" height="6" fill="black" />
                  <rect x="38" y="18" width="8" height="8" fill="black" />
                  <rect x="50" y="20" width="8" height="8" fill="black" />
                  <rect x="8" y="38" width="8" height="8" fill="black" />
                  <rect x="20" y="42" width="6" height="6" fill="black" />
                  <rect x="38" y="38" width="24" height="24" fill="#0AAD38" rx="4" />
                  <rect x="44" y="44" width="12" height="12" fill="white" rx="2" />
                  <rect x="68" y="38" width="8" height="8" fill="black" />
                  <rect x="80" y="42" width="12" height="6" fill="black" />
                  <rect x="38" y="68" width="8" height="8" fill="black" />
                  <rect x="52" y="72" width="6" height="6" fill="black" />
                  <rect x="68" y="68" width="10" height="10" fill="black" />
                  <rect x="82" y="78" width="8" height="8" fill="black" />
                </svg>
                <span className="text-[10px] font-black tracking-wider text-text-secondary mt-1.5 uppercase">
                  Scan & Pay
                </span>
              </div>

              {/* UPI ID and Apps Info */}
              <div className="flex-1 space-y-2.5 text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-black uppercase text-text-muted tracking-wider block">
                    Official Store UPI ID
                  </span>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                    <span className="font-mono font-black text-sm text-text-primary bg-surface-soft px-2.5 py-1 rounded-lg border border-border">
                      alkabeermart@upi
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="inline-flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-text-secondary leading-relaxed">
                  Scan this QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) before or during delivery.
                </div>

                {/* Supported Apps Chips */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className="text-[10px] font-bold bg-surface-soft text-text-secondary px-2 py-0.5 rounded-md border border-border/80">
                    Google Pay
                  </span>
                  <span className="text-[10px] font-bold bg-surface-soft text-text-secondary px-2 py-0.5 rounded-md border border-border/80">
                    PhonePe
                  </span>
                  <span className="text-[10px] font-bold bg-surface-soft text-text-secondary px-2 py-0.5 rounded-md border border-border/80">
                    Paytm
                  </span>
                  <span className="text-[10px] font-bold bg-surface-soft text-text-secondary px-2 py-0.5 rounded-md border border-border/80">
                    BHIM UPI
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 3. CREDIT / DEBIT CARD */}
      <div
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          selectedMethod === 'card'
            ? 'bg-primary-light/30 border-primary shadow-xs ring-1 ring-primary/30'
            : 'bg-surface hover:bg-surface-soft/60 border-border'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectMethod('card')}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                selectedMethod === 'card' ? 'border-primary bg-primary text-white' : 'border-border bg-surface'
              }`}
            >
              {selectedMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-text-primary block">
                {t('checkout.onlineCard')}
              </span>
              <span className="text-[11px] text-text-secondary">
                {t('checkout.onlineCardDesc')}
              </span>
            </div>
          </div>
          <CreditCard className={`w-5 h-5 transition-colors ${selectedMethod === 'card' ? 'text-primary' : 'text-text-muted'}`} />
        </button>

        {/* Expandable Card Form Content */}
        {selectedMethod === 'card' && (
          <div className="px-4 pb-4 pt-2 border-t border-primary/10 animate-fade-in space-y-3">
            <div className="bg-surface p-4 rounded-2xl border border-border/80 space-y-3">
              
              {/* Card Number */}
              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber || ''}
                  onChange={handleCardNumberChange}
                  placeholder="4532 8901 2345 6789"
                  maxLength={19}
                  className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-mono font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-text-primary mb-1">
                    Expiry (MM / YY)
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardExpiry || ''}
                    onChange={handleExpiryChange}
                    placeholder="12/28"
                    maxLength={5}
                    className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-mono font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-text-primary mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={paymentDetails.cardCvv || ''}
                    onChange={handleCvvChange}
                    placeholder="•••"
                    maxLength={3}
                    className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-mono font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                  />
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <label className="block text-xs font-black text-text-primary mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardName || ''}
                  onChange={handleCardNameChange}
                  placeholder="Cardholder Full Name"
                  className="w-full h-10 px-3.5 bg-surface-soft border border-border rounded-xl text-xs sm:text-sm font-medium focus:border-primary focus:bg-surface outline-hidden transition-all text-text-primary"
                />
              </div>

              {/* Security Notice */}
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  This is a payment preference demo. Sensitive card details are not permanently stored or billed online.
                </p>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 4. NET BANKING */}
      <div
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          selectedMethod === 'netbanking'
            ? 'bg-primary-light/30 border-primary shadow-xs ring-1 ring-primary/30'
            : 'bg-surface hover:bg-surface-soft/60 border-border'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelectMethod('netbanking')}
          className="w-full p-4 flex items-center justify-between text-left cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                selectedMethod === 'netbanking' ? 'border-primary bg-primary text-white' : 'border-border bg-surface'
              }`}
            >
              {selectedMethod === 'netbanking' && <div className="w-2 h-2 rounded-full bg-white"></div>}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-text-primary block">
                Net Banking
              </span>
              <span className="text-[11px] text-text-secondary">
                Select your bank from popular Indian banks
              </span>
            </div>
          </div>
          <Building2 className={`w-5 h-5 transition-colors ${selectedMethod === 'netbanking' ? 'text-primary' : 'text-text-muted'}`} />
        </button>

        {/* Expandable Net Banking Content */}
        {selectedMethod === 'netbanking' && (
          <div className="px-4 pb-4 pt-2 border-t border-primary/10 animate-fade-in space-y-3">
            <div className="bg-surface p-4 rounded-2xl border border-border/80 space-y-3">
              <span className="text-xs font-black text-text-primary block">
                Select Your Bank
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popularBanks.map((bank) => {
                  const isBankSelected = paymentDetails.selectedBank === bank.name;
                  return (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => handleBankSelect(bank.name)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-left ${
                        isBankSelected
                          ? 'border-primary bg-primary-light/60 text-primary font-black shadow-2xs'
                          : 'border-border bg-surface-soft hover:bg-surface text-text-secondary'
                      }`}
                    >
                      <span className="truncate">{bank.name}</span>
                      {isBankSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Confirmation tag */}
              {paymentDetails.selectedBank && (
                <div className="p-2.5 bg-primary-light/50 border border-primary/20 rounded-xl text-xs text-primary font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Selected Bank: {paymentDetails.selectedBank}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
