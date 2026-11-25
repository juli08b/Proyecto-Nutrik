// Interruptor reutilizable (on/off)
export default function Switch({ defaultChecked = false, onChange }) {
  return (
    <label className="sw">
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} />
      <i></i>
    </label>
  );
}