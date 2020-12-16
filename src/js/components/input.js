import React from 'react';

const Input = ({ label, value, onChange }) => {
  return (
    <div class="form__group field">
      <input
        type="input"
        class="form__field"
        placeholder="Name"
        name="name"
        id='name'
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label for="name" class="form__label">{label}</label>
    </div>
  )
}

export { Input };
