function SummaryCard({ title, value, variationClass }) {
  return (
    <div className={`kpi-card ${variationClass}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  )
}

export default SummaryCard