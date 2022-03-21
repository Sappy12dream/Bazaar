import React from 'react'

function CreateProduct() {
  return (
    <div className=" Register Login">
      <h3>Create Product!</h3>
      <p>Fill up the form to create</p>
      <form>
        <input
          type="text"
          placeholder="name"
          name="name"
          required
        />
        <input
          type="number"
          placeholder="price"
          name="price"
          required
          min={0}
          step='.01'
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          required
        />
        <input
          type="text"
          placeholder="category"
          name="category"
          required
        />
        <div className="pic">
          <img src='' alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="custom-file-input"
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="login-btn"
        />
        <button>cancel </button>
      </form>
    </div>
  )
}

export default CreateProduct