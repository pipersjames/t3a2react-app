
export default function Label({ Tag, label }) {

  return (
    <div>
        <label htmlFor={Tag}>{label}</label>
    </div>
  );
};
