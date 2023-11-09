export function Select(props) {
    const { titulo, defaultValue = -1, options, placeholder, name, formik } = props;

    return (
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {titulo}
        </label>
  
        <select
          {...formik?.getFieldProps(name)}
          className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          
          <option disabled value={-1}>{placeholder}</option>
          {options?.map((x,index)=>{
              return (
                  <option key={index} value={x.value}>{x.label}</option>
              )
          })}
        </select>
        {formik?.touched[name] && formik?.errors[name] && (
            <div className="text-red-500 text-sm mt-1">{formik?.errors[name]}</div>
          )}
      </div>
    );
  }
  