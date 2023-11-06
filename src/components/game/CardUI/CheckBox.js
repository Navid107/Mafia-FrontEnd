function CustomCheckbox({ character, checked, disabled, onChange }) {
    return (
      <label>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        {checked ? "✔ " : "◻ "}
        {character.name}
      </label>
    );
  }
  export default CustomCheckbox;