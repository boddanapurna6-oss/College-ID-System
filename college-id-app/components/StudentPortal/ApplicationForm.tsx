'use client';

import { useState } from 'react';
import { StudentProfile, processingPrices } from '@/lib/mockData';
import { useApplicationContext } from '@/lib/ApplicationContext';
import PaymentModal from '../Common/PaymentModal';

interface ApplicationFormProps {
  student: StudentProfile;
  onSuccess: () => void;
}

export default function ApplicationForm({ student, onSuccess }: ApplicationFormProps) {
  const { addApplication } = useApplicationContext();
  const [formData, setFormData] = useState({
    type: 'id_card' as 'id_card' | 'certificate' | 'both',
    certificateType: 'completion' as 'completion' | 'excellence' | 'participation',
    processingType: 'standard' as 'standard' | 'expedited',
  });

  const [showPayment, setShowPayment] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const amount = processingPrices[formData.processingType][formData.type as keyof typeof processingPrices[0]];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const newApp = {
      id: `APP${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      studentId: student.id,
      type: formData.type,
      certificateType: formData.type === 'id_card' ? undefined : formData.certificateType,
      status: 'pending' as const,
      processingType: formData.processingType,
      submittedDate: new Date().toISOString(),
      amount,
      studentName: student.name,
      rollNumber: student.rollNumber,
    };

    addApplication(newApp);
    setSubmitted(true);

    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Application Submitted Successfully!</h3>
          <p className="text-muted-foreground">Your application has been recorded. You will receive updates via email.</p>
          <p className="text-sm text-muted-foreground">Redirecting to tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Application Type */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg text-foreground mb-4">1. Select Service Type</h3>
          <div className="space-y-3">
            {[
              { value: 'id_card', label: 'College ID Card', desc: 'Physical ID for campus access' },
              { value: 'certificate', label: 'Certificate', desc: 'Digital & printed certificate' },
              { value: 'both', label: 'ID Card + Certificate', desc: 'Both services together' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.type === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={formData.type === option.value}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as typeof formData.type })}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Certificate Type */}
        {(formData.type === 'certificate' || formData.type === 'both') && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-lg text-foreground mb-4">2. Certificate Type</h3>
            <div className="space-y-3">
              {[
                { value: 'completion', label: 'Degree Completion', desc: 'Official degree completion certificate' },
                { value: 'excellence', label: 'Academic Excellence', desc: 'For outstanding academic performance' },
                { value: 'participation', label: 'Course Participation', desc: 'Course completion certificate' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.certificateType === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="certificateType"
                    value={option.value}
                    checked={formData.certificateType === option.value}
                    onChange={(e) => setFormData({ ...formData, certificateType: e.target.value as typeof formData.certificateType })}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Processing Type */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-lg text-foreground mb-4">3. Processing Speed</h3>
          <div className="space-y-3">
            {[
              { value: 'standard', label: 'Standard (5-7 days)', desc: 'Regular processing' },
              { value: 'expedited', label: 'Expedited (1-2 days)', desc: 'Fast-track processing' },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.processingType === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="processingType"
                  value={option.value}
                  checked={formData.processingType === option.value}
                  onChange={(e) => setFormData({ ...formData, processingType: e.target.value as typeof formData.processingType })}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
          <div className="space-y-3">
            <h3 className="font-bold text-lg text-foreground">Order Summary</h3>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground capitalize">{formData.type.replace('_', ' ')}</span>
              <span className="font-semibold text-foreground">₹{processingPrices.standard[formData.type as keyof typeof processingPrices.standard]}</span>
            </div>
            {formData.processingType === 'expedited' && (
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Expedited Processing</span>
                <span className="font-semibold text-foreground">₹{amount - processingPrices.standard[formData.type as keyof typeof processingPrices.standard]}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">₹{amount}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity text-lg"
        >
          Proceed to Payment
        </button>
      </form>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={amount}
        onSuccess={handlePaymentSuccess}
        description={`${formData.type.replace('_', ' ')} - ${formData.processingType}`}
      />
    </div>
  );
}
