import React from 'react';

const Form = ({submitHandler, input, inputHandler, title}) => {
    return (
        <form onSubmit={submitHandler}>
        <div>
            {title}: <input value={input} onChange={inputHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form;