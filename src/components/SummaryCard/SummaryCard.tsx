import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  variationClass?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, variationClass }) => {
  return (
    <div className={`kpi-card ${variationClass || ''}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
};

export default SummaryCard;